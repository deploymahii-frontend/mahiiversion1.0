import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const STATUS_STYLES = {
  PENDING: "bg-yellow-100 text-yellow-700",
  ACCEPTED: "bg-blue-100 text-blue-700",
  PREPARING: "bg-orange-100 text-orange-700",
  READY: "bg-green-100 text-green-700",
  DELIVERED: "bg-emerald-100 text-emerald-700",
  CANCELLED: "bg-red-100 text-red-700",
};

export default function RecentOrders({
  orders = [],
  loading = false,
}) {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <div className="animate-pulse space-y-4">
          <div className="h-6 w-40 bg-gray-200 rounded" />
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-16 rounded-xl bg-gray-100"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">

      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h2 className="text-xl font-bold">
            Recent Orders
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Latest customer activity
          </p>
        </div>

        <button
          onClick={() => navigate("/orders")}
          className="flex items-center gap-2 text-violet-600 font-medium hover:underline"
        >
          View All
          <ArrowRight size={16} />
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="py-14 text-center text-gray-500">
          No recent orders.
        </div>
      ) : (
        <div className="divide-y">
          {orders.map((order) => (
            <div
              key={order._id}
              className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition"
            >
              <div>
                <h3 className="font-semibold">
                  {order.customerName}
                </h3>

                <p className="text-sm text-gray-500">
                  #{order.orderNumber}
                </p>
              </div>

              <div className="text-right">
                <h3 className="font-bold">
                  ₹{order.total}
                </h3>

                <p className="text-xs text-gray-500">
                  {order.time}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  STATUS_STYLES[order.status] ||
                  "bg-gray-100 text-gray-600"
                }`}
              >
                {order.status}
              </span>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
