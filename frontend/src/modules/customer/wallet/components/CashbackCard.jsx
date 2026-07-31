import { Gift } from "lucide-react";

export default function CashbackCard({ cashback = {} }) {
  const available = cashback.available ?? 0;

  return (
    <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 transition-colors">
      <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 w-fit">
        <Gift size={28} />
      </div>

      <h2 className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-4">Available Cashback</h2>
      <h3 className="text-4xl font-black text-slate-900 dark:text-white mt-1">
        ₹{available.toLocaleString("en-IN")}
      </h3>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
        Automatically applied at checkout on eligible orders.
      </p>
    </section>
  );
}
