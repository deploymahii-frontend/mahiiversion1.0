import {
  FiSmile,
  FiTrendingUp,
  FiUsers,
  FiHome,
  FiAlertTriangle,
  FiBarChart2,
  FiRefreshCw,
} from "react-icons/fi";

export default function CSATAnalytics({
  loading,
  overview = {},
  merchantScores = [],
  agentScores = [],
  regionalScores = [],
  alerts = [],
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
      title: "Overall CSAT",
      value: `${overview.csat ?? 0}%`,
      icon: FiSmile,
      color: "bg-green-500",
    },
    {
      title: "Monthly Growth",
      value: `${overview.growth ?? 0}%`,
      icon: FiTrendingUp,
      color: "bg-blue-500",
    },
    {
      title: "Responses",
      value: overview.responses ?? 0,
      icon: FiUsers,
      color: "bg-purple-500",
    },
    {
      title: "Low CSAT Cases",
      value: overview.lowCases ?? 0,
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
            <h2 className="text-2xl font-bold">CSAT Analytics</h2>
            <p className="text-gray-500">
              Customer satisfaction insights across the platform.
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

      {/* Merchant CSAT */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-5 text-xl font-semibold">
          Merchant-wise CSAT
        </h3>

        <div className="space-y-4">
          {merchantScores.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <div className="flex items-center gap-3">
                <FiHome />
                <span>{item.name}</span>
              </div>

              <strong>{item.csat}%</strong>
            </div>
          ))}
        </div>
      </div>

      {/* Agent CSAT */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-5 text-xl font-semibold">Agent-wise CSAT</h3>

        <div className="space-y-4">
          {agentScores.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <span>{item.agent}</span>
              <strong>{item.csat}%</strong>
            </div>
          ))}
        </div>
      </div>

      {/* Regional Comparison */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-5 text-xl font-semibold">Regional CSAT</h3>

        <div className="space-y-4">
          {regionalScores.map((item) => (
            <div
              key={item.region}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <span>{item.region}</span>
              <strong>{item.csat}%</strong>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-5 text-xl font-semibold">Low CSAT Alerts</h3>

        <div className="space-y-3">
          {alerts.map((alert) => (
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
        CSAT Trend • Satisfaction Drivers • Executive KPI Charts
      </div>

    </div>
  );
}
// Placeholder for CSATAnalytics component
export default function CSATAnalytics() {
  return null;
}
