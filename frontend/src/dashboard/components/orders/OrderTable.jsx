import OrderCard from "./OrderCard";

export default function OrderTable({ orders, onView }) {
  if (!orders?.length) {
    return <div className="rounded-2xl border border-dashed border-gray-300 p-8 text-center text-gray-500">No orders found.</div>;
  }

  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <OrderCard key={order?.id || order?.orderNumber} order={order} onView={onView} />
      ))}
    </div>
  );
}
