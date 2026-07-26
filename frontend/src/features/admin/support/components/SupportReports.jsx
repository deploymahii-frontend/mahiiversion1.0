import {
  FiFileText,
  FiDownload,
  FiMail,
  FiCalendar,
  FiTrendingUp,
  FiUsers,
  FiBarChart2,
  FiRefreshCw,
} from "react-icons/fi";

export default function SupportReports({
  loading,
  summary = {},
  reports = [],
  scheduledReports = [],
  onExportPDF,
  onExportExcel,
  onExportCSV,
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
      title: "Total Tickets",
      value: summary.totalTickets ?? 0,
      icon: FiFileText,
      color: "bg-blue-500",
    },
    {
      title: "Resolved",
      value: summary.resolved ?? 0,
      icon: FiTrendingUp,
      color: "bg-green-500",
    },
    {
      title: "Active Agents",
      value: summary.activeAgents ?? 0,
      icon: FiUsers,
      color: "bg-purple-500",
    },
    {
      title: "Report Period",
      value: summary.period ?? "Monthly",
      icon: FiCalendar,
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
              Support Reports
            </h2>

            <p className="text-gray-500">
              Executive reporting and operational insights.
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

      {/* Report Library */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <h3 className="mb-5 text-xl font-semibold">
          Available Reports
        </h3>

        <div className="space-y-4">
          {reports.map((report) => (
            <div
              key={report.id}
              className="flex flex-wrap items-center justify-between rounded-xl border p-4"
            >
              <div>
                <strong>{report.title}</strong>

                <div className="mt-1 text-sm text-gray-500">
                  {report.description}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onExportPDF?.(report)}
                  className="rounded-lg bg-red-600 px-4 py-2 text-white"
                >
                  PDF
                </button>

                <button
                  onClick={() => onExportExcel?.(report)}
                  className="rounded-lg bg-green-600 px-4 py-2 text-white"
                >
                  Excel
                </button>

                <button
                  onClick={() => onExportCSV?.(report)}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white"
                >
                  CSV
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scheduled Reports */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-5 flex items-center gap-2">
          <FiMail />
          <h3 className="text-xl font-semibold">
            Scheduled Reports
          </h3>
        </div>

        <div className="space-y-4">
          {scheduledReports.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between rounded-xl border p-4"
            >
              <div>
                <strong>{item.name}</strong>

                <div className="mt-1 text-sm text-gray-500">
                  {item.frequency}
                </div>
              </div>

              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="rounded-2xl border border-dashed p-8 text-center text-gray-500">
        <FiBarChart2 className="mx-auto mb-3" size={28} />
        Executive Dashboard • Ticket Trends • Team Performance • SLA & CSAT Summary
      </div>

      {/* Export Actions */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={onExportPDF}
          className="rounded-lg bg-red-600 px-5 py-3 text-white"
        >
          <FiDownload className="mr-2 inline" />
          Export PDF
        </button>

        <button
          onClick={onExportExcel}
          className="rounded-lg bg-green-600 px-5 py-3 text-white"
        >
          <FiDownload className="mr-2 inline" />
          Export Excel
        </button>

        <button
          onClick={onExportCSV}
          className="rounded-lg bg-blue-600 px-5 py-3 text-white"
        >
          <FiDownload className="mr-2 inline" />
          Export CSV
        </button>
      </div>

    </div>
  );
}
