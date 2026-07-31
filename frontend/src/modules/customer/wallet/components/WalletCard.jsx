import { useState } from "react";
import { Wallet, PlusCircle, ArrowUpRight, TrendingUp, TrendingDown } from "lucide-react";
import AddMoneyDialog from "./AddMoneyDialog";

export default function WalletCard({ wallet = {} }) {
  const [showAddMoney, setShowAddMoney] = useState(false);
  const balance = wallet.balance ?? 0;

  return (
    <>
      <section className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-indigo-700 text-white p-8 shadow-lg relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute left-0 bottom-0 -translate-x-10 translate-y-10 w-40 h-40 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex justify-between items-start relative z-10">
          <div>
            <span className="text-xs uppercase font-bold tracking-wider text-blue-200">
              Mahii Wallet Balance
            </span>
            <h1 className="text-5xl font-black mt-3">
              ₹{balance.toLocaleString("en-IN")}
            </h1>
            <p className="text-blue-200 text-xs mt-2 font-medium">
              Available for orders & subscriptions
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md">
            <Wallet size={40} />
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-8 relative z-10">
          <button
            onClick={() => setShowAddMoney(true)}
            className="bg-white text-blue-700 hover:bg-blue-50 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition shadow-md"
          >
            <PlusCircle size={18} />
            Add Money
          </button>

          <button
            onClick={() => alert("Transfer feature coming soon!")}
            className="border border-white/30 bg-white/10 hover:bg-white/20 px-6 py-3 rounded-2xl font-semibold flex items-center gap-2 transition"
          >
            <ArrowUpRight size={18} />
            Transfer
          </button>
        </div>
      </section>

      <AddMoneyDialog isOpen={showAddMoney} onClose={() => setShowAddMoney(false)} />
    </>
  );
}
