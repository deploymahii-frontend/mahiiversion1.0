const GROWTH_CARDS = [
  {
    key: "revenueGrowth",
    title: "Revenue Growth",
    icon: "💰",
    suffix: "%",
  },
  {
    key: "customerGrowth",
    title: "Customer Growth",
    icon: "👥",
    suffix: "%",
  },
  {
    key: "shopGrowth",
    title: "Shop Growth",
    icon: "🏪",
    suffix: "%",
  },
  {
    key: "orderGrowth",
    title: "Order Growth",
    icon: "🛒",
    suffix: "%",
  },
  {
    key: "cityExpansion",
    title: "Cities Active",
    icon: "🌍",
  },
  {
    key: "conversionGrowth",
    title: "Conversion Growth",
    icon: "🎯",
    suffix: "%",
  },
];

function GrowthCard({
  title,
  value,
  icon,
  suffix = "",
}) {
  const positive = Number(value) >= 0;

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <span className="text-3xl">
          {icon}
        </span>

        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold ${
            positive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {positive ? "▲" : "▼"}
        </span>

      </div>

      <h3 className="mt-5 text-sm text-gray-500">
        {title}
      </h3>

      <p className="mt-2 text-3xl font-bold">
        {value ?? "--"}
        {suffix}
      </p>

    </div>
  );
}

export default function GrowthMetrics({
  loading,
  data = {},
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        Loading growth metrics...
      </div>
    );
  }

  const growth = data.growth || {};

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6">

        <h2 className="text-2xl font-bold">
          Growth Metrics
        </h2>

        <p className="text-gray-500">
          Executive overview of business growth.
        </p>

      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

        {GROWTH_CARDS.map((metric) => (

          <GrowthCard
            key={metric.key}
            title={metric.title}
            value={growth[metric.key]}
            icon={metric.icon}
            suffix={metric.suffix}
          />

        ))}

      </div>

      <div className="mt-6 rounded-2xl border border-gray-200 p-6">

        <h3 className="mb-4 text-lg font-semibold">
          Growth Forecast
        </h3>

        <div className="flex h-[320px] items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50">

          <div className="text-center">

            <div className="text-5xl">
              🔮
            </div>

            <p className="mt-3 font-semibold">
              Forecast Chart Placeholder
            </p>

            <p className="mt-2 text-gray-500">
              Future projections using historical growth data.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}
