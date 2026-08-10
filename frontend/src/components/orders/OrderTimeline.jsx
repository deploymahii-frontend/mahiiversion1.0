import { FiCheck, FiPackage, FiClock, FiTruck, FiHome, FiCheckCircle } from "react-icons/fi";

const STAGES = [
  { key: "PLACED", label: "Order Placed", icon: FiClock },
  { key: "ACCEPTED", label: "Accepted by Shop", icon: FiCheck },
  { key: "PREPARING", label: "Preparing Item", icon: FiPackage },
  { key: "OUT_FOR_DELIVERY", label: "Out for Delivery", icon: FiTruck },
  { key: "DELIVERED", label: "Delivered", icon: FiHome },
];

function getStageIndex(status) {
  const normalized = (status || "").toUpperCase();
  if (normalized === "CANCELLED" || normalized === "REJECTED") return -1;
  if (normalized === "DELIVERED" || normalized === "COMPLETED") return 4;
  if (normalized === "OUT_FOR_DELIVERY" || normalized === "READY_FOR_PICKUP") return 3;
  if (normalized === "PREPARING" || normalized === "IN_PROGRESS") return 2;
  if (normalized === "ACCEPTED" || normalized === "CONFIRMED") return 1;
  return 0; // PENDING or PLACED
}

export default function OrderTimeline({ status, currentStep }) {
  const activeIndex = typeof currentStep === "number" ? currentStep : getStageIndex(status);
  const isCancelled = (status || "").toUpperCase() === "CANCELLED";

  if (isCancelled) {
    return (
      <div className="bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-3xl p-6 text-center">
        <p className="text-base font-black text-rose-600 dark:text-rose-400">Order Cancelled</p>
        <p className="text-xs text-rose-500 mt-1">This order was cancelled. If you paid online, your refund will be processed automatically.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
      <h3 className="text-lg font-black text-slate-900 dark:text-white mb-8 flex items-center justify-between">
        <span>Order Status Tracking</span>
        <span className="text-xs font-bold px-3 py-1 bg-orange-50 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 rounded-full border border-orange-200 dark:border-orange-900">
          {STAGES[activeIndex]?.label || "Processing"}
        </span>
      </h3>

      {/* Desktop Stepper */}
      <div className="relative flex items-center justify-between">
        {/* Background Line */}
        <div className="absolute top-5 left-8 right-8 h-1 bg-slate-100 dark:bg-slate-800 -z-0" />
        
        {/* Active Line Progress */}
        <div
          className="absolute top-5 left-8 h-1 bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-500 -z-0"
          style={{ width: `${(activeIndex / (STAGES.length - 1)) * 88}%` }}
        />

        {STAGES.map((stage, idx) => {
          const Icon = stage.icon;
          const isDone = idx < activeIndex;
          const isCurrent = idx === activeIndex;

          return (
            <div key={stage.key} className="relative z-10 flex flex-col items-center group">
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-sm transition-all duration-300 shadow-sm ${
                  isDone
                    ? "bg-emerald-500 text-white ring-4 ring-emerald-500/15"
                    : isCurrent
                    ? "bg-orange-500 text-white ring-4 ring-orange-500/25 animate-pulse"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-400 border border-slate-200 dark:border-slate-700"
                }`}
              >
                {isDone ? <FiCheckCircle size={20} /> : <Icon size={18} />}
              </div>

              <span
                className={`text-xs font-bold mt-3 text-center max-w-[90px] leading-tight ${
                  isDone || isCurrent ? "text-slate-900 dark:text-white" : "text-slate-400 dark:text-slate-600"
                }`}
              >
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
