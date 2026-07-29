import {
  FiShield,
  FiClock,
  FiUser,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiActivity,
} from "react-icons/fi";

export default function AuditTrail({
  loading,
  overview = {},
  logs = [],
  search = "",
  onSearch,
  onRefresh,
  onExportPDF,
  onExportExcel,
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
      title: "Audit Events",
      value: overview.totalEvents ?? 0,
      icon: FiActivity,
      color: "bg-blue-500",
    },
    {
      title: "Today's Events",
      value: overview.todayEvents ?? 0,
      icon: FiClock,
      color: "bg-green-500",
    },
    {
      title: "Active Users",
      value: overview.activeUsers ?? 0,
      icon: FiUser,
      color: "bg-purple-500",
    },
    {
      title: "Security Alerts",
      value: overview.securityAlerts ?? 0,
      icon: FiShield,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              Audit Trail
            </h2>

            <p className="text-gray-500">
              Immutable history of financial and administrative activities.
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

      {/* Search & Filter */}
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row">

          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />

            <input
              value={search}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Search user, event, reference ID..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />
          </div>

          <button className="rounded-lg border px-5 py-2 hover:bg-gray-100">
            <FiFilter className="mr-2 inline" />
            Filters
          </button>

        </div>
      </div>

      {/* Audit Log Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Time</th>
              <th className="p-4 text-left">User</th>
              <th className="p-4 text-left">Action</th>
              <th className="p-4 text-left">Module</th>
              <th className="p-4 text-left">Reference</th>
            </tr>
          </thead>

          <tbody>
            {logs.map((log) => (
              <tr
                key={log.id}
                className="border-t"
              >
                <td className="p-4">{log.timestamp}</td>
                <td className="p-4">{log.user}</td>
                <td className="p-4">{log.action}</td>
                <td className="p-4">{log.module}</td>
                <td className="p-4">{log.reference}</td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Export */}
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

      </div>

    </div>
  );
}
