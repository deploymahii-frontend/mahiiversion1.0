import { Link } from "react-router-dom";

import PaymentStatusBadge from "./PaymentStatusBadge";
import OrderStatusBadge from "./OrderStatusBadge";
import OrderActionMenu from "./OrderActionMenu";

export default function OrderRow({
  order,
  onRefresh,
}) {
  return (
    <tr className="border-b transition hover:bg-gray-50">

      {/* Order ID */}

      <td className="px-6 py-4">

        <Link
          to={`/admin/orders/${order._id}`}
          className="font-semibold hover:text-orange-500"
        >
          #{order._id}
        </Link>

        <p className="mt-1 text-xs text-gray-500">
          {new Date(order.createdAt).toLocaleString()}
        </p>

      </td>

      {/* Customer */}

      <td className="px-6 py-4">

        <div>

          <p className="font-medium">
            {order.customer?.name}
          </p>

          <p className="text-sm text-gray-500">
            {order.customer?.email}
          </p>

        </div>

      </td>

      {/* Shop */}

      <td className="px-6 py-4">

        <div>

          <p className="font-medium">
            {order.shop?.name}
          </p>

          <p className="text-sm text-gray-500">
            {order.shop?.city}
          </p>

        </div>

      </td>

      {/* Amount */}

      <td className="px-6 py-4 font-semibold">
        ₹{order.totalAmount}
      </td>

      {/* Payment */}

      <td className="px-6 py-4">
        <PaymentStatusBadge
          status={order.paymentStatus}
        />
      </td>

      {/* Order Status */}

      <td className="px-6 py-4">
        <OrderStatusBadge
          status={order.orderStatus}
        />
      </td>

      {/* Actions */}

      <td className="px-6 py-4">

        <OrderActionMenu
          order={order}
          onUpdated={onRefresh}
        />

      </td>

    </tr>
  );
}
