const METRICS = [
  {
    key: "requestsPerMinute",
    title: "Requests / Minute",
    icon: "🌐",
    suffix: "",
  },
  {
    key: "activeUsers",
    title: "Active Users",
    icon: "👥",
    suffix: "",
  },
  {
    key: "errorRate",
    title: "Error Rate",
    icon: "❌",
    suffix: "%",
  },
  {
    key: "avgResponseTime",
    title: "Avg Response Time",
    icon: "⚡",
    suffix: " ms",
  },
  {
    key: "ordersToday",
    title: "Orders Today",
    icon: "📦",
    suffix: "",
  },
  {
    key: "revenueToday",
    title: "Revenue Today",
    icon: "💰",
    prefix: "₹",
  },
  {
    key: "activeShops",
    title: "Active Shops",
    icon: "🏪",
    suffix: "",
  },
  {
    key: "deliverySuccessRate",
    title: "Delivery Success",
    icon: "🚚",
    suffix: "%",
  },
];

function MetricCard({
  title,
  icon,
  value,
  prefix = "",
  suffix = "",
}) {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className="text-3xl">{icon}</span>

        <span className="text-sm text-gray-500">
          Live
        </span>
      </div>

      <h3 className="mt-5 text-sm font-medium text-gray-500">
        {title}
      </h3>

      <p className="mt-2 text-3xl font-bold">
        {prefix}
        {value ?? "--"}
        {suffix}
      </p>
    </div>
  );
}

export default function MetricsGrid({
  loading,
  metrics = {},
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        Loading metrics...
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {METRICS.map((metric) => (
        <MetricCard
          key={metric.key}
          title={metric.title}
          icon={metric.icon}
          value={metrics[metric.key]}
          prefix={metric.prefix}
          suffix={metric.suffix}
        />
      ))}
    </div>
  );
}
