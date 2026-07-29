import { Link } from "react-router-dom";
import OrderStatusBadge from "./OrderStatusBadge";

export default function OrderCard({ order }) {
  return (
    <div className="rounded-2xl border bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-gray-500">Order Number</p>
          <h3 className="font-semibold">{order.orderNumber}</h3>
        </div>

        <div>
          <p className="text-sm text-gray-500">Date</p>
          <p>{new Date(order.createdAt).toLocaleDateString()}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Shop</p>
          <p>{order.shop?.name || "Shop"}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Status</p>
          <OrderStatusBadge status={order.status} />
        </div>

        <div>
          <p className="text-sm text-gray-500">Total</p>
          <p className="font-semibold">₹{order.totalAmount}</p>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Link
          to={`/orders/${order._id}`}
          className="text-sm font-semibold text-orange-500 hover:text-orange-600"
        >
          View Details →
        </Link>
      </div>
    </div>
  );
}
