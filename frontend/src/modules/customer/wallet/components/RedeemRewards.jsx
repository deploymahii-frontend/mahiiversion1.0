import { useState } from "react";
import toast from "react-hot-toast";
import { Award, Gift } from "lucide-react";

export default function RedeemRewards({ points = 0 }) {
  const [redeemed, setRedeemed] = useState(false);

  const handleRedeem = (cost, value) => {
    if (points < cost) {
      toast.error("Not enough reward points for this voucher.");
      return;
    }
    toast.success(`Redeemed ₹${value} Mahii Voucher!`);
    setRedeemed(true);
  };

  const vouchers = [
    { cost: 200, value: 50, title: "₹50 Food Voucher" },
    { cost: 500, value: 150, title: "₹150 Grocery Voucher" },
    { cost: 1000, value: 350, title: "₹350 Super Saver Voucher" },
  ];

  return (
    <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 space-y-4 transition-colors">
      <div className="flex items-center gap-3">
        <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
          <Award size={24} />
        </div>
        <div>
          <h3 className="font-bold text-lg text-slate-800 dark:text-white">Redeem Reward Vouchers</h3>
          <p className="text-xs text-slate-400 dark:text-slate-500">Convert your points into instant savings.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 pt-2">
        {vouchers.map((v, idx) => (
          <div key={idx} className="border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 rounded-2xl p-4 flex flex-col justify-between space-y-3 transition-colors">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
              <Gift size={18} />
              <span>{v.title}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">Requires {v.cost} Points</p>
            <button
              onClick={() => handleRedeem(v.cost, v.value)}
              className="w-full py-2.5 bg-blue-600 text-white font-semibold text-xs rounded-xl hover:bg-blue-700 dark:hover:bg-blue-500 transition-colors"
            >
              Redeem Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
