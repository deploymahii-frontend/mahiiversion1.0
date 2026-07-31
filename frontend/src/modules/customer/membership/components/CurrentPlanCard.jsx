import { Crown, CheckCircle2 } from "lucide-react";

export default function CurrentPlanCard({ membership }) {
  if (!membership?.active) return null;

  return (
    <section className="bg-white rounded-3xl p-6 shadow-sm border border-amber-200 bg-amber-50/30 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="p-3.5 rounded-2xl bg-amber-500 text-white shadow-sm">
          <Crown size={28} />
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Active VIP Plan</span>
          <h3 className="text-xl font-black text-slate-900 mt-0.5">{membership.plan}</h3>
          <p className="text-xs text-slate-500 mt-1">Valid through: {membership.expiresAt}</p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
        <CheckCircle2 size={16} /> Active
      </div>
    </section>
  );
}
