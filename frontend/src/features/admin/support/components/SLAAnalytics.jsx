import {
  FiClock,
  FiAlertTriangle,
  FiTrendingUp,
  FiUsers,
  FiHome,
  FiBarChart2,
  FiRefreshCw,
} from "react-icons/fi";

export default function SLAAnalytics({
  loading,
  overview = {},
  agentPerformance = [],
  merchantPerformance = [],
  breaches = [],
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
      title: "SLA Compliance",
      value: `${overview.compliance ?? 0}%`,
      icon: FiClock,
      color: "bg-green-500",
    },
    {
      title: "Average Response",
      value: overview.responseTime ?? "--",
      icon: FiTrendingUp,
      color: "bg-blue-500",
    },
    {
      title: "Average Resolution",
      value: overview.resolutionTime ?? "--",
      icon: FiUsers,
      color: "bg-purple-500",
    },
    {
      title: "SLA Breaches",
      value: overview.breaches ?? 0,
      icon: FiAlertTriangle,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">SLA Analytics</h2>
            <p className="text-gray-500">
              Monitor response times, resolution performance, and SLA compliance.
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
                  <p className="text-sm text-gray-500">{card.title}</p>
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

      {/* Agent SLA */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-5 text-xl font-semibold">Agent SLA Performance</h3>

        <div className="space-y-4">
          {agentPerformance.map((agent) => (
            <div
              key={agent.id}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <span>{agent.name}</span>
              <strong>{agent.compliance}%</strong>
            </div>
          ))}
        </div>
      </div>

      {/* Merchant SLA */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-5 text-xl font-semibold">Merchant SLA Performance</h3>

        <div className="space-y-4">
          {merchantPerformance.map((merchant) => (
            <div
              key={merchant.id}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <div className="flex items-center gap-2">
                <FiHome />
                <span>{merchant.name}</span>
              </div>
              <strong>{merchant.compliance}%</strong>
            </div>
          ))}
        </div>
      </div>

      {/* SLA Breaches */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <FiAlertTriangle />
          <h3 className="text-xl font-semibold">Recent SLA Breaches</h3>
        </div>

        <div className="space-y-3">
          {breaches.map((breach) => (
            <div
              key={breach.id}
              className="rounded-xl border border-red-200 bg-red-50 p-4"
            >
              <strong>{breach.ticketId}</strong>
              <p className="mt-1 text-gray-700">{breach.reason}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="rounded-2xl border border-dashed p-8 text-center text-gray-500">
        <FiBarChart2 className="mx-auto mb-3" size={28} />
        SLA Compliance Trend • Response Time • Resolution Time • Breach Heatmap
      </div>

    </div>
  );
}
