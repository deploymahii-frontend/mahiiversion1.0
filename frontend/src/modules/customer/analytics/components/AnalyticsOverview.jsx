import { ShoppingBag, PiggyBank, Award } from "lucide-react";

export default function AnalyticsOverview({ overview = {} }) {
  const orders = overview.orders ?? 128;
  const saved = overview.saved ?? 8540;
  const shops = overview.shops ?? 34;

  return (
    <section className="grid grid-cols-3 gap-4">
      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm text-center">
        <div className="p-2.5 rounded-2xl bg-blue-50 text-blue-600 w-fit mx-auto">
          <ShoppingBag size={20} />
        </div>
        <p className="text-3xl font-black text-slate-900 mt-2">{orders}</p>
        <p className="text-xs font-semibold text-slate-400 mt-0.5">Total Orders</p>
      </div>

      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm text-center">
        <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-600 w-fit mx-auto">
          <PiggyBank size={20} />
        </div>
        <p className="text-3xl font-black text-slate-900 mt-2">₹{saved.toLocaleString()}</p>
        <p className="text-xs font-semibold text-slate-400 mt-0.5">Total Saved</p>
      </div>

      <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm text-center">
        <div className="p-2.5 rounded-2xl bg-purple-50 text-purple-600 w-fit mx-auto">
          <Award size={20} />
        </div>
        <p className="text-3xl font-black text-slate-900 mt-2">{shops}</p>
        <p className="text-xs font-semibold text-slate-400 mt-0.5">Shops Visited</p>
      </div>
    </section>
  );
}
