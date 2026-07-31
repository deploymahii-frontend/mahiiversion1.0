import { useState } from "react";
import { useShopOrders, useUpdateOrderStatus } from "../hooks/useShopOwner";
import { CheckCircle2, XCircle, ChefHat, Bike, PackageCheck } from "lucide-react";

const STATUS_ACTIONS = {
  PLACED:     [{ label: "Accept",   status: "ACCEPTED",  icon: CheckCircle2, color: "bg-emerald-500" }, { label: "Reject", status: "CANCELLED", icon: XCircle, color: "bg-red-500" }],
  ACCEPTED:   [{ label: "Preparing",status: "PREPARING", icon: ChefHat,      color: "bg-amber-500" }],
  PREPARING:  [{ label: "Ready",    status: "READY",     icon: PackageCheck, color: "bg-blue-500" }],
  READY:      [{ label: "Out for Delivery", status: "OUT_FOR_DELIVERY", icon: Bike, color: "bg-purple-500" }],
  OUT_FOR_DELIVERY: [{ label: "Delivered", status: "DELIVERED", icon: CheckCircle2, color: "bg-emerald-600" }],
};

const STATUS_COLOR = {
  PLACED: "bg-blue-50 text-blue-600",
  ACCEPTED: "bg-amber-50 text-amber-600",
  PREPARING: "bg-orange-50 text-orange-600",
  READY: "bg-purple-50 text-purple-600",
  OUT_FOR_DELIVERY: "bg-indigo-50 text-indigo-600",
  DELIVERED: "bg-emerald-50 text-emerald-600",
  CANCELLED: "bg-red-50 text-red-500",
};

const FILTERS = ["All", "PLACED", "ACCEPTED", "PREPARING", "READY", "DELIVERED"];

export default function ShopOwnerOrders() {
  const [filter, setFilter] = useState("All");
  const { data: orders = [], isLoading } = useShopOrders(
    filter !== "All" ? { status: filter } : {}
  );
  const { mutate: updateStatus, isPending } = useUpdateOrderStatus();

  if (isLoading) {
    return (
      <div className="space-y-4 animate-pulse">
        {[...Array(4)].map((_, i) => <div key={i} className="h-36 bg-slate-200 rounded-2xl" />)}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Orders</h1>
          <p className="text-slate-400 mt-1">{orders.length} orders found</p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${
              filter === f ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-slate-400"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-5xl mb-3">📭</p>
          <p className="font-bold text-slate-700">No orders found</p>
          <p className="text-slate-400 text-sm mt-1">Orders will appear here when customers place them</p>
        </div>
      )}

      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order._id} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="font-black text-slate-900">{order.orderNumber}</h3>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${STATUS_COLOR[order.orderStatus] || "bg-slate-100 text-slate-600"}`}>
                    {order.orderStatus}
                  </span>
                </div>
                <p className="text-sm text-slate-500 mt-1">
                  {order.customer?.name} · {order.customer?.phone}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  {new Date(order.createdAt).toLocaleString("en-IN")}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-slate-900">₹{order.totalAmount}</p>
                <p className="text-xs text-slate-400 mt-0.5">{order.paymentMethod}</p>
              </div>
            </div>

            {/* Items */}
            <div className="mt-4 space-y-1 bg-slate-50 rounded-xl p-3">
              {order.items?.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-slate-700">{item.quantity}× {item.name}</span>
                  <span className="font-semibold text-slate-800">₹{item.total}</span>
                </div>
              ))}
            </div>

            {/* Actions */}
            {STATUS_ACTIONS[order.orderStatus] && (
              <div className="flex gap-3 mt-5">
                {STATUS_ACTIONS[order.orderStatus].map(({ label, status, icon: Icon, color }) => (
                  <button
                    key={status}
                    disabled={isPending}
                    onClick={() => updateStatus({ orderId: order._id, status })}
                    className={`flex items-center gap-2 ${color} text-white px-4 py-2 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity disabled:opacity-50`}
                  >
                    <Icon size={15} />
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
