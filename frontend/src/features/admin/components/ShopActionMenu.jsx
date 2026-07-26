import { Link } from "react-router-dom";
import { useState } from "react";

import * as adminShopService from "../services/adminShop.service";

export default function ShopActionMenu({
  shop,
  onUpdated,
}) {
  const [loading, setLoading] = useState(false);

  async function updateStatus(status) {
    try {
      setLoading(true);

      await adminShopService.updateShopStatus(
        shop._id,
        status
      );

      onUpdated?.();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteShop() {
    const confirmed = window.confirm(
      `Delete "${shop.name}"?`
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      await adminShopService.deleteShop(shop._id);

      onUpdated?.();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-wrap items-center gap-2">

      <Link
        to={`/admin/shops/${shop._id}`}
        className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-100"
      >
        View
      </Link>

      {shop.status === "PENDING" && (
        <>
          <button
            disabled={loading}
            onClick={() => updateStatus("APPROVED")}
            className="rounded-lg bg-green-500 px-3 py-2 text-sm text-white hover:bg-green-600 disabled:opacity-50"
          >
            Approve
          </button>

          <button
            disabled={loading}
            onClick={() => updateStatus("REJECTED")}
            className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-600 disabled:opacity-50"
          >
            Reject
          </button>
        </>
      )}

      {shop.status === "APPROVED" && (
        <button
          disabled={loading}
          onClick={() => updateStatus("SUSPENDED")}
          className="rounded-lg bg-yellow-500 px-3 py-2 text-sm text-white hover:bg-yellow-600 disabled:opacity-50"
        >
          Suspend
        </button>
      )}

      {shop.status === "SUSPENDED" && (
        <button
          disabled={loading}
          onClick={() => updateStatus("APPROVED")}
          className="rounded-lg bg-blue-500 px-3 py-2 text-sm text-white hover:bg-blue-600 disabled:opacity-50"
        >
          Reactivate
        </button>
      )}

      <button
        disabled={loading}
        onClick={deleteShop}
        className="rounded-lg bg-gray-800 px-3 py-2 text-sm text-white hover:bg-black disabled:opacity-50"
      >
        Delete
      </button>

    </div>
  );
}
