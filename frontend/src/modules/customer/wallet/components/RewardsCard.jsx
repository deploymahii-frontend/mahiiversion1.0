import { Award } from "lucide-react";
import { Link } from "react-router-dom";

export default function RewardsCard({ rewards = {} }) {
  const points = rewards.points ?? 0;

  return (
    <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col justify-between transition-colors">
      <div>
        <div className="flex justify-between items-start">
          <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 w-fit">
            <Award size={28} />
          </div>
          <Link to="/customer/rewards" className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            Redeem Points →
          </Link>
        </div>

        <h2 className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-4">Reward Points</h2>
        <h3 className="text-4xl font-black text-slate-900 dark:text-white mt-1">
          {points.toLocaleString("en-IN")}{" "}
          <span className="text-base font-normal text-slate-400 dark:text-slate-500">pts</span>
        </h3>
      </div>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
        Earn 1 point for every ₹100 spent on Mahii.
      </p>
    </section>
  );
}
