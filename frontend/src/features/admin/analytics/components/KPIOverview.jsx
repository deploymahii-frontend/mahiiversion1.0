const KPI_CARDS = [
  {
    key: "revenueToday",
    title: "Revenue Today",
    icon: "💰",
    prefix: "₹",
  },
  {
    key: "ordersToday",
    title: "Orders Today",
    icon: "🛒",
  },
  {
    key: "newCustomers",
    title: "New Customers",
    icon: "👥",
  },
  {
    key: "activeShops",
    title: "Active Shops",
    icon: "🏪",
  },
  {
    key: "avgOrderValue",
    title: "Avg Order Value",
    icon: "📦",
    prefix: "₹",
  },
  {
    key: "conversionRate",
    title: "Conversion Rate",
    icon: "📈",
    suffix: "%",
  },
  {
    key: "customerSatisfaction",
    title: "Customer Satisfaction",
    icon: "⭐",
    suffix: "%",
  },
  {
    key: "deliverySuccessRate",
    title: "Delivery Success",
    icon: "🚚",
    suffix: "%",
  },
];

function TrendBadge({ trend = 0 }) {
  const positive = trend >= 0;

  return (
    <span
      className={`rounded-full px-2 py-1 text-xs font-semibold ${
        positive
          ? "bg-green-100 text-green-700"
          : "bg-red-100 text-red-700"
      }`}
    >
      {positive ? "▲" : "▼"} {Math.abs(trend)}%
    </span>
  );
}

function KPICard({ config, values }) {
  const value = values?.[config.key];
  const trend = values?.trends?.[config.key] ?? 0;

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md">

      <div className="flex items-center justify-between">
        <span className="text-3xl">
          {config.icon}
        </span>

        <TrendBadge trend={trend} />
      </div>

      <h3 className="mt-5 text-sm font-medium text-gray-500">
        {config.title}
      </h3>

      <p className="mt-2 text-3xl font-bold">
        {config.prefix}
        {value ?? "--"}
        {config.suffix}
      </p>

    </div>
  );
}

export default function KPIOverview({
  loading,
  data = {},
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        Loading KPIs...
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

      {KPI_CARDS.map((card) => (
        <KPICard
          key={card.key}
          config={card}
          values={data}
        />
      ))}

    </div>
  );
}
