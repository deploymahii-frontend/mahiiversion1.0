import { Crown, CheckCircle2, Zap, BarChart3, Star, Shield, Megaphone, HeadphonesIcon } from "lucide-react";

const PLANS = [
  {
    id: "free",
    name: "Free",
    price: 0,
    period: "forever",
    badge: "Current Plan",
    badgeColor: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
    gradient: "from-slate-400 to-slate-500",
    features: [
      { text: "Basic shop listing", included: true },
      { text: "Up to 20 products", included: true },
      { text: "Order management", included: true },
      { text: "Basic analytics", included: true },
      { text: "Priority listing", included: false },
      { text: "Advanced analytics", included: false },
      { text: "Promotional tools", included: false },
      { text: "Dedicated support", included: false },
    ],
  },
  {
    id: "gold",
    name: "Mahii Gold",
    price: 499,
    period: "/month",
    badge: "Most Popular",
    badgeColor: "bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400",
    gradient: "from-amber-500 to-orange-500",
    features: [
      { text: "Everything in Free", included: true },
      { text: "Unlimited products", included: true },
      { text: "Priority listing on Explore", included: true },
      { text: "Advanced analytics & insights", included: true },
      { text: "Create offers & promo codes", included: true },
      { text: "Custom shop branding", included: true },
      { text: "Email support", included: true },
      { text: "Dedicated account manager", included: false },
    ],
  },
  {
    id: "premium",
    name: "Mahii Premium",
    price: 1499,
    period: "/month",
    badge: "Best Value",
    badgeColor: "bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-400",
    gradient: "from-purple-500 to-pink-500",
    features: [
      { text: "Everything in Gold", included: true },
      { text: "Top-of-search placement", included: true },
      { text: "Mahii-promoted banners", included: true },
      { text: "Real-time delivery tracking", included: true },
      { text: "Bulk product import/export", included: true },
      { text: "Custom domain for shop", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "Priority phone support 24/7", included: true },
    ],
  },
];

const PERKS = [
  { icon: Zap, label: "Boost Visibility", desc: "Get shown first to nearby customers" },
  { icon: BarChart3, label: "Deep Analytics", desc: "Revenue trends, peak hours, customer insights" },
  { icon: Megaphone, label: "Promo Tools", desc: "Create flash sales & discount codes" },
  { icon: HeadphonesIcon, label: "Priority Support", desc: "Get help when you need it most" },
];

export default function ShopOwnerSubscription() {
  const currentPlan = "free";

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 text-white mb-4 shadow-lg shadow-orange-500/20">
          <Crown size={30} />
        </div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Mahii for Shops</h1>
        <p className="text-slate-400 dark:text-slate-500 mt-2 max-w-md mx-auto">
          Upgrade your shop to unlock premium features, boost visibility, and grow your business
        </p>
      </div>

      {/* Why Upgrade Perks */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {PERKS.map(({ icon: Icon, label, desc }) => (
          <div key={label} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 text-center shadow-sm hover:shadow-md transition">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-950/40 text-orange-500 mb-3">
              <Icon size={22} />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-sm">{label}</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{desc}</p>
          </div>
        ))}
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PLANS.map((plan) => {
          const isCurrent = plan.id === currentPlan;
          const isPopular = plan.id === "gold";
          return (
            <div
              key={plan.id}
              className={`relative bg-white dark:bg-slate-900 rounded-3xl border shadow-sm p-7 flex flex-col transition-all hover:shadow-lg ${
                isPopular
                  ? "border-orange-300 dark:border-orange-700 ring-2 ring-orange-500/20 scale-[1.02]"
                  : "border-slate-100 dark:border-slate-800"
              }`}
            >
              {/* Badge */}
              <span className={`inline-flex self-start px-3 py-1 rounded-full text-xs font-bold mb-4 ${plan.badgeColor}`}>
                {plan.badge}
              </span>

              <h2 className="text-2xl font-black text-slate-900 dark:text-white">{plan.name}</h2>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-black text-slate-900 dark:text-white">
                  {plan.price === 0 ? "Free" : `₹${plan.price}`}
                </span>
                {plan.price > 0 && <span className="text-sm text-slate-400 dark:text-slate-500">{plan.period}</span>}
              </div>

              <div className="mt-6 space-y-3 flex-1">
                {plan.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2.5">
                    {feat.included ? (
                      <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-slate-200 dark:border-slate-700 flex-shrink-0" />
                    )}
                    <span className={`text-sm ${feat.included ? "text-slate-700 dark:text-slate-300 font-medium" : "text-slate-400 dark:text-slate-600"}`}>
                      {feat.text}
                    </span>
                  </div>
                ))}
              </div>

              <button
                disabled={isCurrent}
                className={`mt-7 w-full py-3.5 rounded-2xl font-bold text-sm transition-all ${
                  isCurrent
                    ? "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-default"
                    : `bg-gradient-to-r ${plan.gradient} text-white hover:opacity-90 shadow-lg shadow-orange-500/15`
                }`}
              >
                {isCurrent ? "Current Plan" : plan.price === 0 ? "Downgrade" : "Upgrade Now"}
              </button>
            </div>
          );
        })}
      </div>

      {/* FAQ / Contact */}
      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 text-center">
        <Shield size={28} className="mx-auto text-slate-400 dark:text-slate-500 mb-3" />
        <h3 className="font-bold text-slate-900 dark:text-white">Need help choosing?</h3>
        <p className="text-sm text-slate-400 dark:text-slate-500 mt-2 max-w-md mx-auto">
          Contact our business team at <strong className="text-slate-700 dark:text-slate-300">business@mahii.in</strong> or call <strong className="text-slate-700 dark:text-slate-300">1800-MAHII-00</strong>. Cancel anytime, no lock-in.
        </p>
      </div>
    </div>
  );
}
