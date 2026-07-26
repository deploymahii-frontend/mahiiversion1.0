import {
  FiBarChart2,
  FiTrendingUp,
  FiCalendar,
  FiDownload,
  FiMail,
  FiRefreshCw,
  FiFileText,
  FiFilter,
} from "react-icons/fi";

export default function FinancialReports({
  loading,
  overview = {},
  reports = [],
  onRefresh,
  onExportPDF,
  onExportExcel,
  onExportCSV,
  onScheduleReport,
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
      title: "Generated Reports",
      value: overview.generated ?? 0,
      icon: FiFileText,
      color: "bg-blue-500",
    },
    {
      title: "Scheduled Reports",
      value: overview.scheduled ?? 0,
      icon: FiCalendar,
      color: "bg-green-500",
    },
    {
      title: "Executive Reports",
      value: overview.executive ?? 0,
      icon: FiTrendingUp,
      color: "bg-purple-500",
    },
    {
      title: "Downloads",
      value: overview.downloads ?? 0,
      icon: FiBarChart2,
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
              Financial Reports
            </h2>

            <p className="text-gray-500">
              Executive reporting and financial analytics.
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

      {/* Reports Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Report</th>
              <th className="p-4 text-left">Period</th>
              <th className="p-4 text-left">Generated</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((report) => (
              <tr
                key={report.id}
                className="border-t"
              >
                <td className="p-4">{report.name}</td>
                <td className="p-4">{report.period}</td>
                <td className="p-4">{report.generatedAt}</td>

                <td className="p-4">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                    {report.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">

        <button
          onClick={onExportPDF}
          className="rounded-lg bg-red-600 px-5 py-3 text-white"
        >
          <FiDownload className="mr-2 inline" />
          PDF
        </button>

        <button
          onClick={onExportExcel}
          className="rounded-lg bg-green-600 px-5 py-3 text-white"
        >
          <FiDownload className="mr-2 inline" />
          Excel
        </button>

        <button
          onClick={onExportCSV}
          className="rounded-lg bg-blue-600 px-5 py-3 text-white"
        >
          <FiDownload className="mr-2 inline" />
          CSV
        </button>

        <button
          onClick={onScheduleReport}
          className="rounded-lg bg-purple-600 px-5 py-3 text-white"
        >
          <FiMail className="mr-2 inline" />
          Schedule Report
        </button>

      </div>

      {/* Analytics */}
      <div className="rounded-2xl border border-dashed p-10 text-center text-gray-500">

        <FiFilter
          className="mx-auto mb-3"
          size={30}
        />

        Revenue • Expenses • Profit • Tax • Cash Flow • Trends • Forecasts

      </div>

    </div>
  );
}
