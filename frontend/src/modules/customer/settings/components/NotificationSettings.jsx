import { useState } from "react";
import toast from "react-hot-toast";

export default function NotificationSettings({ settings = {} }) {
  const [prefs, setPrefs] = useState({
    orders: settings.orders ?? true,
    offers: settings.offers ?? true,
    wallet: settings.wallet ?? true,
    membership: settings.membership ?? true,
  });

  const toggle = (key) => {
    const updated = { ...prefs, [key]: !prefs[key] };
    setPrefs(updated);
    toast.success("Notification preferences updated.");
  };

  const items = [
    { key: "orders", label: "Order Status Updates", desc: "Live delivery, accepted, & cancelled alerts" },
    { key: "offers", label: "Promotions & Discounts", desc: "Flash sales, coupon codes, and festival offers" },
    { key: "wallet", label: "Wallet & Cashback", desc: "Instant notifications for cashback and refunds" },
    { key: "membership", label: "Mahii Gold Perks", desc: "Member-exclusive rewards and renewal reminders" },
  ];

  return (
    <section className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
      <h3 className="font-bold text-lg text-slate-800">Notification Preferences</h3>
      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.key} className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-50">
            <div>
              <h4 className="font-semibold text-slate-800 text-sm">{item.label}</h4>
              <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
            </div>
            <button
              onClick={() => toggle(item.key)}
              className={`w-12 h-6 rounded-full transition-colors relative p-0.5 ${
                prefs[item.key] ? "bg-blue-600" : "bg-slate-300"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  prefs[item.key] ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
