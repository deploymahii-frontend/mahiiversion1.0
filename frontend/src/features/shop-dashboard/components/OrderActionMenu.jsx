import { useState } from "react";
import * as shopDashboardService from "../services/shopDashboard.service";

export default function OrderActionMenu({
  order,
  onUpdated,
}) {
  const [loading, setLoading] = useState(false);

  async function updateStatus(status) {
    try {
      setLoading(true);

      await shopDashboardService.updateOrderStatus(order._id, status);

      onUpdated?.();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  switch (order.orderStatus) {
    case "PLACED":
      return (
        <div className="flex gap-2">
          <button
            disabled={loading}
            onClick={() => updateStatus("ACCEPTED")}
            className="rounded-lg bg-green-500 px-3 py-2 text-sm text-white hover:bg-green-600"
          >
            Accept
          </button>

          <button
            disabled={loading}
            onClick={() => updateStatus("CANCELLED")}
            className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white hover:bg-red-600"
          >
            Reject
          </button>
        </div>
      );

    case "ACCEPTED":
      return (
        <button
          disabled={loading}
          onClick={() => updateStatus("PREPARING")}
          className="rounded-lg bg-orange-500 px-3 py-2 text-sm text-white hover:bg-orange-600"
        >
          Start Preparing
        </button>
      );

    case "PREPARING":
      return (
        <button
          disabled={loading}
          onClick={() => updateStatus("READY")}
          className="rounded-lg bg-purple-500 px-3 py-2 text-sm text-white hover:bg-purple-600"
        >
          Mark Ready
        </button>
      );

    case "READY":
      return (
        <button
          disabled={loading}
          onClick={() => updateStatus("DELIVERED")}
          className="rounded-lg bg-blue-500 px-3 py-2 text-sm text-white hover:bg-blue-600"
        >
          Complete
        </button>
      );

    default:
      return (
        <span className="text-sm text-gray-400">No Actions</span>
      );
  }
}
