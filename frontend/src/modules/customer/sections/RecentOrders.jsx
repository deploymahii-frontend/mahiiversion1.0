import { RefreshCw, Clock, Package, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const STATUS_COLORS = {
  PLACED: "bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300",
  CONFIRMED: "bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300",
  PREPARING: "bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300",
  OUT_FOR_DELIVERY: "bg-orange-100 dark:bg-orange-950/60 text-orange-700 dark:text-orange-300",
  DELIVERED: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300",
  COMPLETED: "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300",
  CANCELLED: "bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300",
};

export default function RecentOrders({ orders = [] }) {
  if (!orders.length) {
    return (
      <section>
        <div className="flex justify-between items-center mb-5">
          <div>
            <h3 className="text-lg font-bold text-slate-800 dark:text-white">Recent Orders</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Order again with one click</p>
          </div>
        </div>
        <div className="rounded-3xl border-2 border-dashed border-slate-200 dark:border-slate-800 p-12 text-center bg-white/50 dark:bg-slate-900/50">
          <Package size={48} className="mx-auto text-slate-300 dark:text-slate-600" />
          <p className="mt-4 text-slate-600 dark:text-slate-300 font-medium">No orders yet</p>
          <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Start exploring nearby shops!</p>
          <Link
            to="/explore"
            className="inline-flex mt-5 rounded-xl bg-blue-600 text-white px-6 py-3 font-semibold hover:bg-blue-700 transition shadow-sm"
          >
            Explore Shops
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="flex justify-between items-center mb-5">
        <div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-white">Recent Orders</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">Order again with one click</p>
        </div>
        <Link
          to="/customer/orders"
          className="text-blue-600 dark:text-blue-400 text-sm font-semibold flex items-center gap-1 hover:underline"
        >
          View All <ChevronRight size={16} />
        </Link>
      </div>
      <div className="space-y-3">
        {orders.map((order) => {
          const statusClass =
            STATUS_COLORS[order.status?.toUpperCase()] || "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300";
          const timeAgo = order.createdAt
            ? new Date(order.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
              })
            : "Recently";

          return (
            <div
              key={order.id || order._id}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300 flex justify-between items-center group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <h4 className="font-bold text-slate-800 dark:text-white truncate">
                    {order.shopName}
                  </h4>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${statusClass}`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 text-sm mt-2">
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} />
                    {timeAgo}
                  </span>
                  <span className="font-semibold text-slate-700 dark:text-slate-200">
                    ₹{order.totalAmount?.toLocaleString()}
                  </span>
                  {order.itemsCount > 0 && (
                    <span className="text-slate-400 dark:text-slate-500">
                      {order.itemsCount} item{order.itemsCount > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              </div>
              <button className="rounded-xl bg-blue-600 text-white px-5 py-2.5 font-semibold flex items-center gap-2 hover:bg-blue-700 transition opacity-90 group-hover:opacity-100 shadow-sm">
                <RefreshCw size={15} />
                Reorder
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
