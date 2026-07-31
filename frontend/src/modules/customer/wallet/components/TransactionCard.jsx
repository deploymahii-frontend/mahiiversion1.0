import { ArrowDownLeft, ArrowUpRight } from "lucide-react";

export default function TransactionCard({ transaction }) {
  if (!transaction) return null;

  const isCredit = transaction.type === "credit" || transaction.type === "CREDIT";

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 flex items-center justify-between hover:shadow-sm transition-colors">
      <div className="flex items-center gap-3">
        <div
          className={`p-2.5 rounded-xl ${
            isCredit
              ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400"
              : "bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400"
          }`}
        >
          {isCredit ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
        </div>
        <div>
          <h4 className="font-semibold text-slate-800 dark:text-slate-200 text-sm">
            {transaction.title || transaction.description || "Wallet Activity"}
          </h4>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">
            {transaction.date || "Recent"}
          </p>
        </div>
      </div>

      <div
        className={`font-bold text-sm ${
          isCredit
            ? "text-emerald-600 dark:text-emerald-400"
            : "text-slate-800 dark:text-slate-200"
        }`}
      >
        {isCredit ? "+" : "-"}₹{(transaction.amount || 0).toLocaleString("en-IN")}
      </div>
    </div>
  );
}
