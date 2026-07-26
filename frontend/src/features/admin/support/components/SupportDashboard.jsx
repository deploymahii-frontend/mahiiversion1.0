import {
  FiAlertCircle,
  FiCheckCircle,
  FiClock,
  FiUsers,
  FiMessageSquare,
  FiTrendingUp,
  FiHeadphones,
  FiRefreshCw,
} from "react-icons/fi";

export default function SupportDashboard({
  loading,
  statistics = {},
  onRefresh,
}) {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="h-40 animate-pulse rounded-2xl bg-white"
          />
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Open Tickets",
      value: statistics.openTickets ?? 0,
      icon: FiAlertCircle,
      color: "bg-red-500",
    },
    {
      title: "Resolved Today",
      value: statistics.resolvedToday ?? 0,
      icon: FiCheckCircle,
      color: "bg-green-500",
    },
    {
      title: "Average Response",
      value: statistics.avgResponseTime ?? "--",
      icon: FiClock,
      color: "bg-blue-500",
    },
    {
      title: "Online Agents",
      value: statistics.onlineAgents ?? 0,
      icon: FiUsers,
      color: "bg-purple-500",
    },
    {
      title: "Live Chats",
      value: statistics.liveChats ?? 0,
      icon: FiMessageSquare,
      color: "bg-cyan-500",
    },
    {
      title: "SLA Compliance",
      value: `${statistics.slaCompliance ?? 0}%`,
      icon: FiTrendingUp,
      color: "bg-orange-500",
    },
    {
      title: "Customer Satisfaction",
      value: `${statistics.csat ?? 0}%`,
      icon: FiHeadphones,
      color: "bg-pink-500",
    },
    {
      title: "Escalated Tickets",
      value: statistics.escalatedTickets ?? 0,
      icon: FiAlertCircle,
      color: "bg-yellow-500",
    },
  ];

  return (
    <div>

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold">
            Support Dashboard
          </h2>

          <p className="text-gray-500">
            Real-time customer support operations overview
          </p>
        </div>

        <button
          onClick={onRefresh}
          className="flex items-center gap-2 rounded-xl border px-4 py-2 hover:bg-gray-100"
        >
          <FiRefreshCw />
          Refresh
        </button>

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
                  <Icon size={24} />
                </div>

              </div>
            </div>
          );
        })}

      </div>

      <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">

        <h3 className="text-xl font-semibold">
          Live Support Overview
        </h3>

        <div className="mt-5 grid gap-6 lg:grid-cols-3">

          <div className="rounded-xl border p-5">
            <h4 className="font-semibold">Ticket Queue</h4>
            <p className="mt-3 text-gray-500">
              Waiting, In Progress, Escalated,
              Pending Customer, Resolved
            </p>
          </div>

          <div className="rounded-xl border p-5">
            <h4 className="font-semibold">Agent Status</h4>
            <p className="mt-3 text-gray-500">
              Online, Busy, Away, Offline,
              Active Chats
            </p>
          </div>

          <div className="rounded-xl border p-5">
            <h4 className="font-semibold">Customer Health</h4>
            <p className="mt-3 text-gray-500">
              VIP Customers, High Priority,
              Churn Risk, Recent Complaints
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
