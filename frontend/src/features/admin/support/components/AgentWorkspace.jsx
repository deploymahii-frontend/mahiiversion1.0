import {
  FiUser,
  FiCircle,
  FiMessageCircle,
  FiInbox,
  FiClock,
  FiStar,
  FiTrendingUp,
  FiRefreshCw,
} from "react-icons/fi";

const statusColors = {
  ONLINE: "text-green-500",
  AWAY: "text-yellow-500",
  OFFLINE: "text-gray-400",
};

export default function AgentWorkspace({
  loading,
  agents = [],
  onViewProfile,
  onReassignWorkload,
}) {
  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-64 animate-pulse rounded-2xl bg-white"
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">Agent Workspace</h2>
        <p className="text-gray-500">Monitor support agents and workload distribution.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="rounded-2xl bg-white p-6 shadow-sm"
          >
            <div className="mb-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-gray-100 p-3">
                  <FiUser size={24} />
                </div>
                <div>
                  <h3 className="font-bold">{agent.name}</h3>
                  <div className="flex items-center gap-2">
                    <FiCircle
                      className={statusColors[agent.status]}
                      size={10}
                    />
                    <span className="text-sm">{agent.status}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  <FiInbox />
                  Active Tickets
                </span>
                <strong>{agent.activeTickets}</strong>
              </div>

              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  <FiMessageCircle />
                  Live Chats
                </span>
                <strong>{agent.liveChats}</strong>
              </div>

              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  <FiClock />
                  Avg Resolution
                </span>
                <strong>{agent.avgResolutionTime} hr</strong>
              </div>

              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  <FiStar />
                  CSAT
                </span>
                <strong>{agent.csat}%</strong>
              </div>

              <div className="flex justify-between">
                <span className="flex items-center gap-2">
                  <FiTrendingUp />
                  Productivity
                </span>
                <strong>{agent.productivity}%</strong>
              </div>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => onViewProfile?.(agent)}
                className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                View
              </button>
              <button
                onClick={() => onReassignWorkload?.(agent)}
                className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
              >
                <FiRefreshCw />
                Reassign
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
