import { Package, Store } from "lucide-react";

export default function OrderHeader({ order }) {
  if (!order) return null;

  return (
    <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-xs font-bold tracking-wider text-slate-400 uppercase">Order Details</span>
          <h2 className="text-2xl font-black text-slate-900 mt-1">
            #{order.orderNumber || order._id}
          </h2>
          <div className="flex items-center gap-2 text-slate-600 mt-3 font-medium">
            <Store size={18} className="text-blue-600" />
            <span>{order.shop?.name || order.shopName || "Mahii Partner Shop"}</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-blue-50 text-blue-600">
          <Package size={32} />
        </div>
      </div>
    </section>
  );
}
