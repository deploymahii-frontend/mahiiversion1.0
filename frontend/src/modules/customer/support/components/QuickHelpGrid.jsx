import { Package, CreditCard, Truck, RefreshCw, MessageSquare } from "lucide-react";

export default function QuickHelpGrid({ onSelectCategory }) {
  const categories = [
    { icon: Package, title: "Orders & Delivery", desc: "Track status or report missing items", value: "ORDER" },
    { icon: CreditCard, title: "Payments & Wallet", desc: "Failed transaction or refund inquiry", value: "PAYMENT" },
    { icon: RefreshCw, title: "Cancellations", desc: "Policy and instant refund eligibility", value: "CANCEL" },
    { icon: MessageSquare, title: "Partner Complaints", desc: "Quality or service concerns", value: "COMPLAINT" },
  ];

  return (
    <section className="space-y-3">
      <h3 className="font-bold text-slate-800 text-base">Quick Help Categories</h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((c) => {
          const Icon = c.icon;
          return (
            <button
              key={c.value}
              onClick={() => onSelectCategory(c.value)}
              className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 text-left hover:shadow-md hover:border-blue-200 transition group"
            >
              <div className="p-3 rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition w-fit">
                <Icon size={22} />
              </div>
              <h4 className="font-bold text-slate-800 text-sm mt-3">{c.title}</h4>
              <p className="text-xs text-slate-400 mt-1">{c.desc}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
