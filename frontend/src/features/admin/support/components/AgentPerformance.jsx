import {
  FiAward,
  FiClock,
  FiTrendingUp,
  FiUsers,
  FiStar,
  FiTarget,
  FiBarChart2,
  FiRefreshCw,
} from "react-icons/fi";

export default function AgentPerformance({
  loading,
  overview = {},
  leaderboard = [],
  coachingAlerts = [],
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
      title: "Tickets Resolved",
      value: overview.ticketsResolved ?? 0,
      icon: FiUsers,
      color: "bg-blue-500",
    },
    {
      title: "Avg Response Time",
      value: overview.responseTime ?? "--",
      icon: FiClock,
      color: "bg-green-500",
    },
    {
      title: "Average CSAT",
      value: `${overview.csat ?? 0}%`,
      icon: FiStar,
      color: "bg-yellow-500",
    },
    {
      title: "SLA Compliance",
      value: `${overview.sla ?? 0}%`,
      icon: FiTarget,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Agent Performance
            </h2>

            <p className="text-gray-500">
              Productivity, quality, and coaching insights.
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

      {/* Leaderboard */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <FiAward />
          <h3 className="text-xl font-semibold">
            Agent Leaderboard
          </h3>
        </div>

        <div className="space-y-4">
          {leaderboard.map((agent, index) => (
            <div
              key={agent.id}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <div>
                <strong>
                  #{index + 1} {agent.name}
                </strong>

                <div className="mt-1 text-sm text-gray-500">
                  {agent.tickets} tickets resolved
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold">
                  {agent.score}
                </div>

                <div className="text-sm text-gray-500">
                  Performance Score
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coaching */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <FiTrendingUp />
          <h3 className="text-xl font-semibold">
            Coaching Opportunities
          </h3>
        </div>

        <div className="space-y-3">
          {coachingAlerts.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-yellow-200 bg-yellow-50 p-4"
            >
              <strong>{item.agent}</strong>
              <p className="mt-1 text-gray-700">
                {item.message}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="rounded-2xl border border-dashed p-8 text-center text-gray-500">
        <FiBarChart2 className="mx-auto mb-3" size={28} />
        Productivity Trends • CSAT by Agent • SLA Compliance • Performance History
      </div>

    </div>
  );
}
