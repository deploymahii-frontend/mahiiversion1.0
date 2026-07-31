import { Truck, Clock3 } from "lucide-react";
import { ORDER_STATUS_LABELS } from "../constants/orderStatus";

export default function DeliveryInfo({ order }) {
  if (!order) return null;

  const statusLabel = ORDER_STATUS_LABELS[order.status] || order.status;

  return (
    <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-slate-800">Delivery Status</h3>
          <p className="text-lg font-semibold text-blue-600 mt-1">{statusLabel}</p>
          {order.estimatedDelivery && (
            <div className="flex items-center gap-1.5 text-sm text-slate-500 mt-2">
              <Clock3 size={15} />
              <span>ETA: {order.estimatedDelivery}</span>
            </div>
          )}
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-600">
          <Truck size={36} />
        </div>
      </div>
    </section>
  );
}
