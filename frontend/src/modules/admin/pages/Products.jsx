import { useEffect, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import api from "@/services/api";

export default function Products() {
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const response = await api.get("/admin/products");
        setProducts(response?.data?.data?.products || []);
      } catch (err) {
        setError(err?.response?.data?.message || "Unable to load products");
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const term = search.toLowerCase();
    return products.filter((product) => {
      const haystack = `${product.name || ""} ${product.category || ""} ${product.shop?.name || ""}`.toLowerCase();
      return haystack.includes(term);
    });
  }, [search, products]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-5 py-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Products Management</h1>
            <p className="mt-2 text-gray-500">Review and manage product catalog data from the backend.</p>
          </div>
        </div>

        <div className="mb-6 relative max-w-md">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full rounded-3xl border bg-white py-3 pl-12 pr-4"
            placeholder="Search products..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="overflow-x-auto rounded-3xl bg-white shadow-sm">
          <table className="min-w-full">
            <thead className="border-b bg-gray-100">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Shop</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">Loading products…</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-red-500">{error}</td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">No products found.</td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id || product._id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium">{product.name || "—"}</td>
                    <td className="p-4">{product.category || "—"}</td>
                    <td className="p-4">{product.shop?.name || "—"}</td>
                    <td className="p-4">₹{product.price?.toFixed?.(2) ?? product.price ?? "—"}</td>
                    <td className="p-4">{product.status || "—"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
