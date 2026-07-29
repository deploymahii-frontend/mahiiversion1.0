import { Link } from "react-router-dom";
import { useState } from "react";
import * as shopDashboardService from "../services/shopDashboard.service";

export default function ProductActionMenu({
  product,
  onUpdated,
}) {
  const [loading, setLoading] = useState(false);

  async function toggleAvailability() {
    try {
      setLoading(true);

      await shopDashboardService.toggleProductAvailability(
        product._id,
        !product.available
      );

      onUpdated?.();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteProduct() {
    const confirmed = window.confirm(`Delete "${product.name}"?`);
    if (!confirmed) return;

    try {
      setLoading(true);

      await shopDashboardService.deleteProduct(product._id);

      onUpdated?.();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        to={`/shop/products/edit/${product._id}`}
        className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-100"
      >
        Edit
      </Link>

      <button
        disabled={loading}
        onClick={toggleAvailability}
        className="rounded-lg bg-orange-500 px-3 py-2 text-sm text-white hover:bg-orange-600 disabled:opacity-50"
      >
        {product.available ? "Disable" : "Enable"}
      </button>

      <button
        disabled={loading}
        onClick={deleteProduct}
        className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-600 disabled:opacity-50"
      >
        Delete
      </button>
    </div>
  );
}
