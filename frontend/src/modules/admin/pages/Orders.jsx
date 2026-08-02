import { useEffect, useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import api from "@/services/api";

export default function Orders() {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const response = await api.get("/admin/orders");
        setOrders(response?.data?.data?.orders || []);
      } catch (err) {
        setError(err?.response?.data?.message || "Unable to load orders");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    const term = search.toLowerCase();
    return orders.filter((order) => {
      const haystack = `${order.orderNumber || ""} ${order.customer?.name || ""} ${order.shop?.name || ""}`.toLowerCase();
      return haystack.includes(term);
    });
  }, [search, orders]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-5 py-8">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Orders Management</h1>
            <p className="mt-2 text-gray-500">Review and manage incoming orders from the backend.</p>
          </div>
        </div>

        <div className="mb-6 relative max-w-md">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full rounded-3xl border bg-white py-3 pl-12 pr-4"
            placeholder="Search orders..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="overflow-x-auto rounded-3xl bg-white shadow-sm">
          <table className="min-w-full">
            <thead className="border-b bg-gray-100">
              <tr>
                <th className="p-4 text-left">Order #</th>
                <th className="p-4 text-left">Customer</th>
                <th className="p-4 text-left">Shop</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Order Status</th>
                <th className="p-4 text-left">Payment Status</th>
                <th className="p-4 text-left">Created</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-500">
                    Loading orders…
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-red-500">
                    {error}
                  </td>
                </tr>
              ) : filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="p-8 text-center text-gray-500">
                    No orders found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order.id || order._id} className="border-b hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium">{order.orderNumber || "—"}</td>
                    <td className="p-4">{order.customer?.name || "—"}</td>
                    <td className="p-4">{order.shop?.name || "—"}</td>
                    <td className="p-4">₹{order.totalAmount?.toFixed?.(2) ?? order.totalAmount ?? "—"}</td>
                    <td className="p-4">{order.orderStatus || "—"}</td>
                    <td className="p-4">{order.paymentStatus || "—"}</td>
                    <td className="p-4">{new Date(order.createdAt).toLocaleDateString()}</td>
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
