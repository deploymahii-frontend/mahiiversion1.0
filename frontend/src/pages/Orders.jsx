import useOrders from "../hooks/useOrders";
import OrderCard from "../components/orders/OrderCard";

export default function Orders() {
  const { orders, loading } = useOrders();

  if (loading) return <div className="p-10">Loading...</div>;

  if (!orders.length) return <div className="p-10">No Orders Yet</div>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-5">
      <h1 className="text-4xl font-bold mb-8">My Orders</h1>

      <div className="space-y-5">
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
}
