import { Link } from "react-router-dom";
import { useState } from "react";

import * as adminOrderService from "../services/adminOrder.service";

export default function OrderActionMenu({
  order,
  onUpdated,
}) {
  const [loading, setLoading] = useState(false);

  async function updateStatus(status) {
    try {
      setLoading(true);

      await adminOrderService.updateOrderStatus(
        order._id,
        status
      );

      onUpdated?.();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function deleteOrder() {
    const confirmed = window.confirm(
      `Delete Order #${order._id}?`
    );

    if (!confirmed) return;

    try {
      setLoading(true);

      await adminOrderService.deleteOrder(order._id);

      onUpdated?.();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">

      <Link
        to={`/admin/orders/${order._id}`}
        className="rounded-lg border px-3 py-2 text-sm hover:bg-gray-100"
      >
        View
      </Link>

      {order.orderStatus === "PLACED" && (
        <button
          disabled={loading}
          onClick={() => updateStatus("CONFIRMED")}
          className="rounded-lg bg-blue-500 px-3 py-2 text-sm text-white hover:bg-blue-600"
        >
          Confirm
        </button>
      )}

      {order.orderStatus === "CONFIRMED" && (
        <button
          disabled={loading}
          onClick={() => updateStatus("PREPARING")}
          className="rounded-lg bg-orange-500 px-3 py-2 text-sm text-white hover:bg-orange-600"
        >
          Preparing
        </button>
      )}

      {order.orderStatus === "PREPARING" && (
        <button
          disabled={loading}
          onClick={() => updateStatus("READY")}
          className="rounded-lg bg-indigo-500 px-3 py-2 text-sm text-white hover:bg-indigo-600"
        >
          Ready
        </button>
      )}

      {order.orderStatus === "READY" && (
        <button
          disabled={loading}
          onClick={() =>
            updateStatus("OUT_FOR_DELIVERY")
          }
          className="rounded-lg bg-purple-500 px-3 py-2 text-sm text-white hover:bg-purple-600"
        >
          Dispatch
        </button>
      )}

      {order.orderStatus === "OUT_FOR_DELIVERY" && (
        <button
          disabled={loading}
          onClick={() => updateStatus("DELIVERED")}
          className="rounded-lg bg-green-500 px-3 py-2 text-sm text-white hover:bg-green-600"
        >
          Delivered
        </button>
      )}

      {['PLACED', 'CONFIRMED'].includes(order.orderStatus) && (
        <button
          disabled={loading}
          onClick={() => updateStatus("CANCELLED")}
          className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-600"
        >
          Cancel
        </button>
      )}

      {['DELIVERED', 'CANCELLED'].includes(order.orderStatus) && (
        <button
          disabled={loading}
          onClick={deleteOrder}
          className="rounded-lg bg-gray-800 px-3 py-2 text-sm text-white hover:bg-black"
        >
          Delete
        </button>
      )}

    </div>
  );
}
