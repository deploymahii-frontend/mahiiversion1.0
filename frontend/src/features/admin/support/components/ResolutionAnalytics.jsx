import {
  FiTarget,
  FiClock,
  FiTrendingUp,
  FiUsers,
  FiTag,
  FiCpu,
  FiBarChart2,
  FiRefreshCw,
} from "react-icons/fi";

export default function ResolutionAnalytics({
  loading,
  overview = {},
  categoryPerformance = [],
  agentPerformance = [],
  aiPerformance = {},
  onRefresh,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[700px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  const cards = [
    {
      title: "First Contact Resolution",
      value: `${overview.fcr ?? 0}%`,
      icon: FiTarget,
      color: "bg-green-500",
    },
    {
      title: "Avg Resolution Time",
      value: overview.avgResolutionTime ?? "--",
      icon: FiClock,
      color: "bg-blue-500",
    },
    {
      title: "Resolved Tickets",
      value: overview.resolvedTickets ?? 0,
      icon: FiUsers,
      color: "bg-purple-500",
    },
    {
      title: "Resolution Trend",
      value: `${overview.trend ?? 0}%`,
      icon: FiTrendingUp,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Resolution Analytics
            </h2>

            <p className="text-gray-500">
              Measure issue resolution efficiency and quality.
            </p>
          </div>

          <button
            onClick={onRefresh}
            className="rounded-lg border p-3 hover:bg-gray-100"
          >
            <FiRefreshCw />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">
                    {card.title}
                  </p>

                  <h3 className="mt-3 text-3xl font-bold">
                    {card.value}
                  </h3>
                </div>

                <div className={`${card.color} rounded-xl p-3 text-white`}>
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Resolution by Category */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <FiTag />
          <h3 className="text-xl font-semibold">
            Resolution by Category
          </h3>
        </div>

        <div className="space-y-4">
          {categoryPerformance.map((category) => (
            <div
              key={category.name}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <span>{category.name}</span>
              <strong>{category.rate}%</strong>
            </div>
          ))}
        </div>
      </div>

      {/* Agent Performance */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-5 text-xl font-semibold">
          Agent Resolution Performance
        </h3>

        <div className="space-y-4">
          {agentPerformance.map((agent) => (
            <div
              key={agent.id}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <span>{agent.name}</span>
              <strong>{agent.resolutionRate}%</strong>
            </div>
          ))}
        </div>
      </div>

      {/* AI Performance */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <FiCpu />
          <h3 className="text-xl font-semibold">
            AI-assisted Resolution
          </h3>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Metric
            label="AI Suggestions Used"
            value={`${aiPerformance.usage ?? 0}%`}
          />
          <Metric
            label="Acceptance Rate"
            value={`${aiPerformance.acceptance ?? 0}%`}
          />
          <Metric
            label="Time Saved"
            value={aiPerformance.timeSaved ?? "--"}
          />
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="rounded-2xl border border-dashed p-8 text-center text-gray-500">
        <FiBarChart2 className="mx-auto mb-3" size={28} />
        Resolution Trend • FCR Trend • Category Analysis • Executive KPIs
      </div>

    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-xl border p-4 text-center">
      <div className="text-sm text-gray-500">{label}</div>
      <div className="mt-2 text-2xl font-bold">{value}</div>
    </div>
  );
}
