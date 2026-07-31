export default function ETAProgress({ etaPercentage = 65 }) {
  return (
    <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-slate-800 text-sm">Delivery Progress</h3>
        <span className="text-xs font-bold text-emerald-600">{etaPercentage}%</span>
      </div>
      <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
        <div
          style={{ width: `${Math.min(100, Math.max(0, etaPercentage))}%` }}
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-500"
        />
      </div>
    </section>
  );
}
