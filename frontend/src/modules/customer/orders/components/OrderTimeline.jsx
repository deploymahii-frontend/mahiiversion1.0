import { CheckCircle2, Clock, Circle } from "lucide-react";
import { ORDER_TIMELINE_STEPS, ORDER_STATUS_LABELS } from "../constants/orderStatus";

export default function OrderTimeline({ status, timeline = [] }) {
  const currentStepIndex = ORDER_TIMELINE_STEPS.indexOf(status);
  const isCancelled = status === "CANCELLED";

  if (isCancelled) {
    return (
      <section className="bg-red-50 border border-red-200 rounded-3xl p-6 text-red-700">
        <h3 className="font-bold text-lg">Order Cancelled</h3>
        <p className="text-sm mt-1 text-red-600">This order has been cancelled and refunded if applicable.</p>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
      <h3 className="font-bold text-lg text-slate-800 mb-6">Order Status Timeline</h3>
      
      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
        {ORDER_TIMELINE_STEPS.map((step, idx) => {
          const isCompleted = idx <= currentStepIndex;
          const isCurrent = idx === currentStepIndex;
          const label = ORDER_STATUS_LABELS[step] || step;

          return (
            <div key={step} className="relative flex items-center gap-4">
              <div
                className={`absolute -left-6 flex items-center justify-center w-5 h-5 rounded-full bg-white transition-colors ${
                  isCompleted ? "text-emerald-600" : isCurrent ? "text-blue-600" : "text-slate-300"
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2 size={20} className="fill-emerald-100" />
                ) : isCurrent ? (
                  <Clock size={20} className="animate-pulse" />
                ) : (
                  <Circle size={16} />
                )}
              </div>

              <div>
                <p className={`font-semibold text-sm ${isCurrent ? "text-blue-600" : isCompleted ? "text-slate-800" : "text-slate-400"}`}>
                  {label}
                </p>
                {isCurrent && (
                  <p className="text-xs text-slate-400 mt-0.5">In progress...</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
