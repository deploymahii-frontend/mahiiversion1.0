const metrics = [
  {
    title: "Active Shops",
    key: "activeShops",
    color: "text-green-600",
  },
  {
    title: "Active Customers",
    key: "activeCustomers",
    color: "text-blue-600",
  },
  {
    title: "Pending Orders",
    key: "pendingOrders",
    color: "text-orange-600",
  },
  {
    title: "Average Rating",
    key: "averageRating",
    color: "text-yellow-600",
  },
  {
    title: "Platform Growth",
    key: "platformGrowth",
    color: "text-purple-600",
    suffix: "%",
  },
];

export default function PlatformOverview({
  data = {},
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-xl font-semibold">
        Platform Overview
      </h2>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">

        {metrics.map((metric) => (
          <div
            key={metric.key}
            className="rounded-xl border border-gray-100 bg-gray-50 p-5"
          >
            <p className="text-sm text-gray-500">
              {metric.title}
            </p>

            <h3
              className={`mt-2 text-3xl font-bold ${metric.color}`}
            >
              {data[metric.key] ?? 0}
              {metric.suffix || ""}
            </h3>
          </div>
        ))}

      </div>

    </div>
  );
}
