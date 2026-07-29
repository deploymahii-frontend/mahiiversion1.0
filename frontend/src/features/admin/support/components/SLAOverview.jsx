import {
  FiClock,
  FiAlertTriangle,
  FiTrendingUp,
  FiUsers,
  FiFileText,
} from "react-icons/fi";

export default function SLAOverview({
  loading,
  sla = {},
  teams = [],
  highRiskTickets = [],
  onViewReport,
}) {
  if (loading) {
    return (
      <div className="grid gap-6 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="h-72 animate-pulse rounded-2xl bg-white"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">

      {/* SLA Summary */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <h2 className="mb-5 text-xl font-bold">
          SLA Summary
        </h2>

        <div className="space-y-4">

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FiTrendingUp />
              Compliance
            </span>
            <strong>{sla.compliance}%</strong>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FiClock />
              Avg Response
            </span>
            <strong>{sla.avgResponseTime} min</strong>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FiClock />
              Avg Resolution
            </span>
            <strong>{sla.avgResolutionTime} hr</strong>
          </div>

          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <FiAlertTriangle />
              SLA Breaches
            </span>
            <strong>{sla.breaches}</strong>
          </div>

        </div>

      </div>

      {/* Team Performance */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <h2 className="mb-5 text-xl font-bold">
          Team Performance
        </h2>

        <div className="space-y-4">

          {teams.map((team) => (

            <div
              key={team.id}
              className="rounded-xl border p-4"
            >

              <div className="mb-2 flex items-center justify-between">

                <div className="flex items-center gap-2">
                  <FiUsers />
                  <strong>{team.name}</strong>
                </div>

                <span>{team.compliance}%</span>

              </div>

              <div className="h-2 rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-green-500"
                  style={{ width: `${team.compliance}%` }}
                />
              </div>

            </div>

          ))}

        </div>

      </div>

      {/* High-Risk Tickets */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">

        <div className="mb-5 flex items-center justify-between">

          <h2 className="text-xl font-bold">
            High-Risk Tickets
          </h2>

          <button
            onClick={onViewReport}
            className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
          >
            <FiFileText />
            Report
          </button>

        </div>

        <div className="space-y-3">

          {highRiskTickets.map((ticket) => (

            <div
              key={ticket.id}
              className="rounded-xl border border-red-200 bg-red-50 p-4"
            >

              <div className="font-semibold">
                {ticket.ticketNumber}
              </div>

              <div className="text-sm text-gray-600">
                {ticket.subject}
              </div>

              <div className="mt-2 text-sm text-red-600">
                SLA Remaining: {ticket.remaining}
              </div>

            </div>

          ))}

          {highRiskTickets.length === 0 && (
            <p className="text-gray-500">
              No high-risk tickets.
            </p>
          )}

        </div>

      </div>

    </div>
  );
}
