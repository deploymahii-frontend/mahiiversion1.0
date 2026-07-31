import { Truck, Percent, Headset, Zap, Gift, ShieldCheck } from "lucide-react";

export default function BenefitsGrid() {
  const benefits = [
    { icon: Truck, title: "Free Delivery*", desc: "Zero delivery fee on orders above ₹149 across all partner shops." },
    { icon: Percent, title: "Extra 10% OFF", desc: "Automatic extra discount on monthly mess & tiffin subscriptions." },
    { icon: Headset, title: "Priority Support", desc: "Skip the line with 24/7 dedicated support agents." },
    { icon: Zap, title: "Member Flash Deals", desc: "Exclusive access to limited-time food & grocery drops." },
    { icon: Gift, title: "2x Reward Points", desc: "Earn double reward points on every transaction." },
    { icon: ShieldCheck, title: "No Surge Fees", desc: "Protected pricing during peak hours and rain." },
  ];

  return (
    <section className="space-y-4">
      <h2 className="text-xl font-black text-slate-900">Mahii Gold VIP Benefits</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {benefits.map((b, idx) => {
          const Icon = b.icon;
          return (
            <div key={idx} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-start gap-4">
              <div className="p-3 rounded-2xl bg-amber-50 text-amber-600">
                <Icon size={24} />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{b.title}</h3>
                <p className="text-xs text-slate-500 mt-1">{b.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
