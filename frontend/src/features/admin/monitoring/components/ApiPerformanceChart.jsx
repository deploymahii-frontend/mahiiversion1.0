const METRIC_CARDS = [
  {
    key: "avgResponseTime",
    title: "Average Response",
    unit: "ms",
    icon: "⚡",
  },
  {
    key: "p95Latency",
    title: "P95 Latency",
    unit: "ms",
    icon: "📈",
  },
  {
    key: "p99Latency",
    title: "P99 Latency",
    unit: "ms",
    icon: "🚀",
  },
  {
    key: "errorRate",
    title: "Error Rate",
    unit: "%",
    icon: "❌",
  },
];

export default function ApiPerformanceChart({
  loading,
  data = {},
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        Loading API performance...
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div>
        <h2 className="text-2xl font-bold">
          API Performance
        </h2>

        <p className="text-gray-500">
          Response time, latency and request trends.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

        {METRIC_CARDS.map((metric) => (

          <div
            key={metric.key}
            className="rounded-2xl bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">

              <span className="text-3xl">
                {metric.icon}
              </span>

              <span className="text-3xl font-bold">
                {data.summary?.[metric.key] ?? "--"}
                {metric.unit}
              </span>

            </div>

            <p className="mt-4 text-gray-500">
              {metric.title}
            </p>

          </div>

        ))}

      </div>

      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <div className="mb-5 flex items-center justify-between">

          <h3 className="text-lg font-semibold">
            API Response Trend
          </h3>

          <select
            className="rounded-lg border px-3 py-2"
          >
            <option>Last Hour</option>
            <option>Last 24 Hours</option>
            <option>Last 7 Days</option>
          </select>

        </div>

        <div className="flex h-[320px] items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50">

          <div className="text-center">

            <p className="text-lg font-semibold">
              API Performance Chart
            </p>

            <p className="mt-2 text-gray-500">
              Replace this placeholder with
              Recharts / Chart.js / ECharts.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}
