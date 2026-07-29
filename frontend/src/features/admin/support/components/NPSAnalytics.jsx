import {
  FiTrendingUp,
  FiUsers,
  FiThumbsUp,
  FiThumbsDown,
  FiMinusCircle,
  FiAlertTriangle,
  FiBarChart2,
  FiRefreshCw,
} from "react-icons/fi";

export default function NPSAnalytics({
  loading,
  overview = {},
  merchantScores = [],
  agentScores = [],
  detractorAlerts = [],
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
      title: "Overall NPS",
      value: overview.nps ?? 0,
      icon: FiTrendingUp,
      color: "bg-green-500",
    },
    {
      title: "Promoters",
      value: overview.promoters ?? 0,
      icon: FiThumbsUp,
      color: "bg-blue-500",
    },
    {
      title: "Passives",
      value: overview.passives ?? 0,
      icon: FiMinusCircle,
      color: "bg-yellow-500",
    },
    {
      title: "Detractors",
      value: overview.detractors ?? 0,
      icon: FiThumbsDown,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">NPS Analytics</h2>
            <p className="text-gray-500">
              Measure customer loyalty and advocacy.
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
                  <h3 className="mt-3 text-3xl font-bold">{card.value}</h3>
                </div>

                <div className={`${card.color} rounded-xl p-3 text-white`}>
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Merchant NPS */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-5 text-xl font-semibold">
          Merchant-wise NPS
        </h3>

        <div className="space-y-4">
          {merchantScores.map((merchant) => (
            <div
              key={merchant.id}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <span>{merchant.name}</span>
              <strong>{merchant.nps}</strong>
            </div>
          ))}
        </div>
      </div>

      {/* Agent NPS */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-5 text-xl font-semibold">Agent-wise NPS</h3>

        <div className="space-y-4">
          {agentScores.map((agent) => (
            <div
              key={agent.id}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <span>{agent.name}</span>
              <strong>{agent.nps}</strong>
            </div>
          ))}
        </div>
      </div>

      {/* Detractor Alerts */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <FiAlertTriangle />
          <h3 className="text-xl font-semibold">
            Detractor Alerts
          </h3>
        </div>

        <div className="space-y-3">
          {detractorAlerts.map((alert) => (
            <div
              key={alert.id}
              className="rounded-xl border border-red-200 bg-red-50 p-4"
            >
              {alert.message}
            </div>
          ))}
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="rounded-2xl border border-dashed p-8 text-center text-gray-500">
        <FiBarChart2 className="mx-auto mb-3" size={28} />
        NPS Trend • Loyalty Analysis • Recommendation Drivers
      </div>

    </div>
  );
}
