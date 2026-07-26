import { useEffect } from "react";
import useOrders from "../hooks/useOrders";
import OrderCard from "../components/OrderCard";

export default function OrderHistory() {
  const { orders, loading, error, loadOrders } = useOrders();

  useEffect(() => {
    loadOrders();
  }, []);

  if (loading) {
    return <div className="p-8">Loading orders...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">{error}</div>;
  }

  if (!orders.length) {
    return <div className="p-8">No orders found.</div>;
  }

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-8 text-3xl font-bold">My Orders</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
}
