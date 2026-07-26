import {
  FiBarChart2,
  FiClock,
  FiAlertTriangle,
  FiCheckCircle,
  FiTrendingUp,
  FiPieChart,
  FiUsers,
  FiActivity,
} from "react-icons/fi";

export default function TicketStatistics({
  loading,
  statistics = {},
}) {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-2xl bg-white"
          />
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Tickets Today",
      value: statistics.ticketsToday ?? 0,
      icon: FiBarChart2,
      color: "bg-blue-500",
    },
    {
      title: "Avg Response",
      value: statistics.avgResponse ?? "--",
      icon: FiClock,
      color: "bg-green-500",
    },
    {
      title: "High Priority",
      value: statistics.highPriority ?? 0,
      icon: FiAlertTriangle,
      color: "bg-red-500",
    },
    {
      title: "Resolved Today",
      value: statistics.resolvedToday ?? 0,
      icon: FiCheckCircle,
      color: "bg-purple-500",
    },
    {
      title: "SLA Compliance",
      value: `${statistics.slaCompliance ?? 0}%`,
      icon: FiTrendingUp,
      color: "bg-orange-500",
    },
    {
      title: "Categories",
      value: statistics.categories ?? 0,
      icon: FiPieChart,
      color: "bg-cyan-500",
    },
    {
      title: "Active Agents",
      value: statistics.activeAgents ?? 0,
      icon: FiUsers,
      color: "bg-pink-500",
    },
    {
      title: "Resolution Rate",
      value: `${statistics.resolutionRate ?? 0}%`,
      icon: FiActivity,
      color: "bg-indigo-500",
    },
  ];

  return (
    <div>

      <div className="mb-6">
        <h2 className="text-2xl font-bold">
          Ticket Statistics
        </h2>

        <p className="text-gray-500">
          Ticket performance and operational metrics
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {cards.map((card) => {

          const Icon = card.icon;

          return (

            <div
              key={card.title}
              className="rounded-2xl bg-white p-6 shadow-sm"
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

                <div
                  className={`${card.color} rounded-xl p-3 text-white`}
                >
                  <Icon size={22} />
                </div>

              </div>

            </div>

          );

        })}

      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <h3 className="mb-4 text-lg font-semibold">
            Ticket Distribution
          </h3>

          <div className="rounded-xl border border-dashed p-10 text-center text-gray-500">
            Category Distribution Chart
            <br />
            (Billing, Orders, Payments, Delivery, Technical, Others)
          </div>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <h3 className="mb-4 text-lg font-semibold">
            Resolution Trend
          </h3>

          <div className="rounded-xl border border-dashed p-10 text-center text-gray-500">
            Daily / Weekly Resolution Trend
          </div>

        </div>

      </div>

      <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">

        <h3 className="mb-4 text-lg font-semibold">
          Agent Workload
        </h3>

        <div className="rounded-xl border border-dashed p-10 text-center text-gray-500">
          Active Tickets per Agent • Pending Queue • Average Handling Time
        </div>

      </div>

    </div>
  );
}
