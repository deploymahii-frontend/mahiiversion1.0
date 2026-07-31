import TransactionCard from "./TransactionCard";
import { Receipt } from "lucide-react";

export default function TransactionList({ transactions = [], isLoading }) {
  if (isLoading) {
    return (
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 space-y-3 animate-pulse">
        <div className="h-6 w-48 bg-slate-200 dark:bg-slate-800 rounded-lg" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 rounded-2xl bg-slate-100 dark:bg-slate-800" />
        ))}
      </section>
    );
  }

  if (!transactions.length) {
    return (
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-10 border border-slate-100 dark:border-slate-800 text-center transition-colors">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto">
          <Receipt size={28} className="text-slate-400 dark:text-slate-500" />
        </div>
        <h3 className="font-bold text-slate-700 dark:text-slate-300 mt-4">No Transactions Yet</h3>
        <p className="text-sm text-slate-400 dark:text-slate-500 mt-1">
          Your wallet activity will appear here once you start using Mahii.
        </p>
      </section>
    );
  }

  return (
    <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 space-y-4 transition-colors">
      <h3 className="font-bold text-lg text-slate-800 dark:text-white mb-2">Recent Transactions</h3>
      <div className="space-y-2">
        {transactions.map((tx, idx) => (
          <TransactionCard key={tx.id || tx._id || idx} transaction={tx} />
        ))}
      </div>
    </section>
  );
}
