import { PiggyBank, TrendingUp } from "lucide-react";

export default function SavingsCard({ savings = {} }) {
  const totalSaved = savings.totalSaved ?? 2450;
  const ordersCount = savings.ordersWithBenefits ?? 36;

  return (
    <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-600">
          <PiggyBank size={36} />
        </div>
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-slate-400">Total Gold Savings</span>
          <h3 className="text-3xl font-black text-slate-900 mt-0.5">₹{totalSaved.toLocaleString()}</h3>
          <p className="text-xs text-slate-500 mt-1">Saved across {ordersCount} orders with VIP perks.</p>
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-2 text-emerald-600 font-bold text-sm bg-emerald-50 px-4 py-2 rounded-2xl">
        <TrendingUp size={18} /> High ROI
      </div>
    </section>
  );
}
