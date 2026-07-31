import { Link } from "react-router-dom";
import { Clock3, ChevronRight, ShoppingBag } from "lucide-react";
import { ORDER_STATUS_LABELS } from "../constants/orderStatus";

export default function OrderCard({ order }) {
  if (!order) return null;

  const shopName = order.shop?.name || order.shopName || "Mahii Partner";
  const statusLabel = ORDER_STATUS_LABELS[order.status] || order.status || "Processing";
  const isDelivered = order.status === "DELIVERED";
  const isCancelled = order.status === "CANCELLED";

  const statusColorClass = isDelivered
    ? "text-emerald-600 bg-emerald-50"
    : isCancelled
    ? "text-red-600 bg-red-50"
    : "text-blue-600 bg-blue-50";

  return (
    <Link
      to={`/customer/orders/${order._id}`}
      className="block rounded-3xl bg-white p-6 shadow-sm hover:shadow-md border border-slate-100 transition group"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
            <ShoppingBag size={22} />
          </div>
          <div>
            <h2 className="font-bold text-lg text-slate-800 group-hover:text-blue-600 transition">
              {shopName}
            </h2>
            <p className="text-sm text-slate-400 mt-0.5">
              Order #{order._id?.slice(-8) || order._id}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColorClass}`}>
            {statusLabel}
          </span>
          <ChevronRight size={18} className="text-slate-400 group-hover:translate-x-0.5 transition" />
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 flex justify-between items-center text-sm">
        <div className="flex items-center gap-2 text-slate-500">
          <Clock3 size={15} />
          <span>{order.deliveredAt || order.estimatedDelivery || "Standard Delivery"}</span>
        </div>

        <div className="font-bold text-slate-900 text-base">
          ₹{order.grandTotal || order.totalAmount || order.total || 0}
        </div>
      </div>
    </Link>
  );
}
