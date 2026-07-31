import { Check } from "lucide-react";
import toast from "react-hot-toast";

export default function PlanCard({ plan, isPopular }) {
  if (!plan) return null;

  const handleJoin = () => {
    toast.success(`Joined ${plan.name} Plan successfully!`);
  };

  return (
    <section className={`rounded-3xl p-8 flex flex-col justify-between relative transition ${
      isPopular
        ? "bg-gradient-to-b from-amber-500 to-orange-600 text-white shadow-xl scale-105"
        : "bg-white text-slate-900 border border-slate-200 shadow-sm"
    }`}>
      {isPopular && (
        <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-black text-amber-400 font-extrabold text-xs px-4 py-1 rounded-full uppercase tracking-wider shadow-md">
          Most Popular
        </span>
      )}

      <div>
        <h3 className="text-xl font-extrabold">{plan.name}</h3>
        <div className="mt-4 flex items-baseline gap-1">
          <span className="text-4xl font-black">₹{plan.price}</span>
          <span className={`text-xs ${isPopular ? "text-amber-100" : "text-slate-400"}`}>/{plan.duration || "month"}</span>
        </div>

        <ul className="space-y-3 mt-6">
          {plan.features?.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 text-sm font-medium">
              <Check size={16} className={isPopular ? "text-amber-200" : "text-amber-500"} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={handleJoin}
        className={`w-full mt-8 py-3.5 rounded-2xl font-bold transition shadow-sm ${
          isPopular
            ? "bg-white text-amber-700 hover:bg-amber-50"
            : "bg-amber-500 text-white hover:bg-amber-600"
        }`}
      >
        Join Mahii Gold
      </button>
    </section>
  );
}
