import {
  FiTrendingUp,
  FiBarChart2,
  FiUsers,
  FiRefreshCw,
  FiDollarSign,
  FiTarget,
  FiGlobe,
  FiPieChart,
} from "react-icons/fi";

const metrics = [
  {
    key: "mrr",
    title: "MRR",
    icon: FiDollarSign,
    prefix: "₹",
    color: "bg-green-500",
  },
  {
    key: "arr",
    title: "ARR",
    icon: FiTrendingUp,
    prefix: "₹",
    color: "bg-blue-500",
  },
  {
    key: "subscriberGrowth",
    title: "Subscriber Growth",
    icon: FiUsers,
    suffix: "%",
    color: "bg-indigo-500",
  },
  {
    key: "churnRate",
    title: "Churn Rate",
    icon: FiRefreshCw,
    suffix: "%",
    color: "bg-red-500",
  },
  {
    key: "renewalRate",
    title: "Renewal Rate",
    icon: FiBarChart2,
    suffix: "%",
    color: "bg-cyan-500",
  },
  {
    key: "ltv",
    title: "Lifetime Value",
    icon: FiDollarSign,
    prefix: "₹",
    color: "bg-purple-500",
  },
  {
    key: "arpu",
    title: "ARPU",
    icon: FiPieChart,
    prefix: "₹",
    color: "bg-orange-500",
  },
  {
    key: "conversionRate",
    title: "Conversion",
    icon: FiTarget,
    suffix: "%",
    color: "bg-pink-500",
  },
  {
    key: "regionalRevenue",
    title: "Top Region Revenue",
    icon: FiGlobe,
    prefix: "₹",
    color: "bg-teal-500",
  },
];

export default function SubscriptionAnalytics({
  loading,
  analytics = {},
}) {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-5">
        {Array.from({ length: metrics.length }).map((_, i) => (
          <div
            key={i}
            className="h-36 animate-pulse rounded-2xl bg-white"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-5">

      {metrics.map((metric) => {
        const Icon = metric.icon;

        return (
          <div
            key={metric.key}
            className="rounded-2xl bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-gray-500">
                  {metric.title}
                </p>

                <h3 className="mt-3 text-2xl font-bold">
                  {metric.prefix || ""}
                  {analytics[metric.key] ?? 0}
                  {metric.suffix || ""}
                </h3>

              </div>

              <div
                className={`${metric.color} rounded-xl p-3 text-white`}
              >
                <Icon size={22} />
              </div>

            </div>
          </div>
        );
      })}

    </div>
  );
}
