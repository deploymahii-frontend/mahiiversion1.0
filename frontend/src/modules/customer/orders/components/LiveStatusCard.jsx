import { Truck, Clock3 } from "lucide-react";
import { ORDER_STATUS_LABELS } from "../constants/orderStatus";

export default function LiveStatusCard({ order }) {
  if (!order) return null;

  const statusLabel = ORDER_STATUS_LABELS[order.status] || order.status;

  return (
    <section className="rounded-3xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-emerald-100">Current Status</span>
          <h2 className="text-3xl font-black mt-1">{statusLabel}</h2>

          <div className="mt-4 flex items-center gap-2 text-emerald-100 font-medium">
            <Clock3 size={18} />
            <span>Estimated Arrival: <strong className="text-white">{order.eta || "15-20 min"}</strong></span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md">
          <Truck size={48} />
        </div>
      </div>
    </section>
  );
}
