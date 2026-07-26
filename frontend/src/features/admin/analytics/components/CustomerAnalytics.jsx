const CUSTOMER_METRICS = [
  {
    key: "newCustomers",
    title: "New Customers",
    icon: "🆕",
  },
  {
    key: "returningCustomers",
    title: "Returning Customers",
    icon: "🔁",
  },
  {
    key: "repeatPurchaseRate",
    title: "Repeat Purchase Rate",
    icon: "🛍️",
    suffix: "%",
  },
  {
    key: "customerLifetimeValue",
    title: "Customer Lifetime Value",
    icon: "💎",
    prefix: "₹",
  },
  {
    key: "customerSatisfaction",
    title: "Customer Satisfaction",
    icon: "⭐",
    suffix: "%",
  },
  {
    key: "activeCustomers",
    title: "Active Customers",
    icon: "👥",
  },
];

function MetricCard({
  title,
  value,
  icon,
  prefix = "",
  suffix = "",
}) {
  return (
    <div className="rounded-xl border border-gray-200 p-4">

      <div className="flex items-center justify-between">
        <span className="text-3xl">{icon}</span>

        <span className="text-2xl font-bold">
          {prefix}
          {value ?? "--"}
          {suffix}
        </span>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        {title}
      </p>

    </div>
  );
}

export default function CustomerAnalytics({
  loading,
  data = {},
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        Loading customer analytics...
      </div>
    );
  }

  const customer = data.customer || {};

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Customer Analytics
        </h2>

        <p className="text-gray-500">
          Acquisition, retention, and customer value.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">

        {CUSTOMER_METRICS.map((metric) => (
          <MetricCard
            key={metric.key}
            title={metric.title}
            icon={metric.icon}
            value={customer[metric.key]}
            prefix={metric.prefix}
            suffix={metric.suffix}
          />
        ))}

      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">

        <div className="rounded-xl border border-gray-200 p-5">

          <h3 className="mb-4 font-semibold">
            Customer Growth Trend
          </h3>

          <div className="flex h-[260px] items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50">
            <div className="text-center">
              <div className="text-5xl">📈</div>
              <p className="mt-3">
                Growth Chart Placeholder
              </p>
            </div>
          </div>

        </div>

        <div className="rounded-xl border border-gray-200 p-5">

          <h3 className="mb-4 font-semibold">
            Geographic Distribution
          </h3>

          <div className="flex h-[260px] items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50">
            <div className="text-center">
              <div className="text-5xl">🌍</div>
              <p className="mt-3">
                Map / Region Chart Placeholder
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
