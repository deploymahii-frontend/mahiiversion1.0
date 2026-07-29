import { Link } from "react-router-dom";
import OrderStatusBadge from "./OrderStatusBadge";
import OrderActionMenu from "./OrderActionMenu";

export default function OrderRow({ order }) {
  return (
    <tr className="border-b transition hover:bg-gray-50">
      <td className="px-6 py-4">
        <div>
          <p className="font-semibold">{order.orderNumber}</p>
          <p className="text-xs text-gray-500">
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
      </td>

      <td className="px-6 py-4">
        <div>
          <p className="font-medium">{order.customer?.name}</p>
          <p className="text-sm text-gray-500">{order.customer?.phone}</p>
        </div>
      </td>

      <td className="px-6 py-4 font-semibold">₹{order.totalAmount}</td>

      <td className="px-6 py-4">
        <OrderStatusBadge status={order.orderStatus} />
      </td>

      <td className="px-6 py-4 text-sm text-gray-500">
        {new Date(order.createdAt).toLocaleTimeString()}
      </td>

      <td className="px-6 py-4">
        <div className="flex items-center justify-center gap-3">
          <Link
            to={`/shop/orders/${order._id}`}
            className="text-sm font-medium text-orange-500 hover:underline"
          >
            View
          </Link>
          <OrderActionMenu order={order} />
        </div>
      </td>
    </tr>
  );
}
