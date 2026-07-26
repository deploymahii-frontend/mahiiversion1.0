import {
  FiTrendingUp,
  FiClock,
  FiUsers,
  FiStar,
  FiAlertTriangle,
  FiDownload,
} from "react-icons/fi";

export default function SupportAnalytics({
  loading,
  analytics = {},
  onExport,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-96 animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  const metrics = [
    {
      title: "Tickets Created",
      value: analytics.ticketsCreated,
      icon: FiTrendingUp,
      color: "bg-blue-500",
    },
    {
      title: "Tickets Resolved",
      value: analytics.ticketsResolved,
      icon: FiTrendingUp,
      color: "bg-green-500",
    },
    {
      title: "Avg Response Time",
      value: `${analytics.avgResponseTime} min`,
      icon: FiClock,
      color: "bg-indigo-500",
    },
    {
      title: "Avg Resolution Time",
      value: `${analytics.avgResolutionTime} hr`,
      icon: FiClock,
      color: "bg-purple-500",
    },
    {
      title: "Agent Productivity",
      value: `${analytics.agentProductivity}%`,
      icon: FiUsers,
      color: "bg-orange-500",
    },
    {
      title: "Customer Satisfaction",
      value: `${analytics.csat}%`,
      icon: FiStar,
      color: "bg-yellow-500",
    },
    {
      title: "Escalation Rate",
      value: `${analytics.escalationRate}%`,
      icon: FiAlertTriangle,
      color: "bg-red-500",
    },
    {
      title: "SLA Compliance",
      value: `${analytics.slaCompliance}%`,
      icon: FiTrendingUp,
      color: "bg-cyan-500",
    },
  ];

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

        <div>
          <h2 className="text-2xl font-bold">
            Support Analytics
          </h2>
          <p className="text-gray-500">
            Operational insights for the support organization.
          </p>
        </div>

        <button
          onClick={onExport}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
        >
          <FiDownload />
          Export Report
        </button>

      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div
              key={metric.title}
              className="rounded-xl border bg-gray-50 p-5"
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-gray-500">
                    {metric.title}
                  </p>

                  <h3 className="mt-2 text-2xl font-bold">
                    {metric.value ?? "-"}
                  </h3>

                </div>

                <div
                  className={`${metric.color} rounded-xl p-3 text-white`}
                >
                  <Icon size={22} />
                </div>

              </div>

            </div>
          );
        })}

      </div>

      <div className="mt-8 rounded-xl border border-dashed p-8 text-center text-gray-500">
        <p className="font-medium">
          Charts Area
        </p>
        <p className="mt-2 text-sm">
          Ticket trends, response times, CSAT trends, agent performance,
          escalation analysis, and SLA trends can be rendered here using
          your preferred charting library.
        </p>
      </div>

    </div>
  );
}
