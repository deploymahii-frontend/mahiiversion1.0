import { Wallet, Gift, TrendingUp, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function WalletSection({ wallet }) {
  const balance = wallet?.balance ?? 0;
  const cashback = wallet?.cashback ?? 0;

  return (
    <section className="rounded-3xl bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 p-7 text-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-teal-300/20 rounded-full blur-xl" />

      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2">
            <Wallet size={20} className="text-white/80" />
            <p className="text-white/80 text-sm font-semibold uppercase tracking-wider">
              Mahii Wallet
            </p>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mt-3">
            ₹{balance.toLocaleString()}
          </h2>
          {cashback > 0 && (
            <div className="flex items-center gap-2 mt-3 text-white/90 text-sm">
              <TrendingUp size={14} />
              <span>₹{cashback} cashback available</span>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <Link
            to="/customer/wallet"
            className="rounded-xl bg-white text-teal-600 px-5 py-3 font-bold flex items-center gap-2 hover:bg-teal-50 transition shadow-lg shadow-teal-900/20"
          >
            <Plus size={18} />
            Add Money
          </Link>
          <Link
            to="/customer/rewards"
            className="rounded-xl bg-white/15 backdrop-blur-sm border border-white/30 text-white px-5 py-3 font-semibold flex items-center gap-2 hover:bg-white/25 transition"
          >
            <Gift size={18} />
            Rewards
          </Link>
        </div>
      </div>
    </section>
  );
}
