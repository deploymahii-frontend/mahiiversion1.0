import { Link } from "react-router-dom";

export default function OrderCard({ order }) {
  return (
    <Link
      to={`/orders/${order._id}`}
      className="block bg-white rounded-3xl shadow p-6 hover:shadow-xl transition"
    >
      <div className="flex justify-between">
        <div>
          <h2 className="font-bold text-xl">{order.orderNumber}</h2>

          <p className="text-gray-500 mt-1">{order.shop?.name}</p>
        </div>

        <div className="text-right">
          <div className="font-bold">₹{order.totalAmount}</div>

          <div className="text-sm text-orange-500">{order.orderStatus}</div>
        </div>
      </div>

      <div className="mt-4 text-sm text-gray-500">{order.items.length} Items</div>
    </Link>
  );
}
