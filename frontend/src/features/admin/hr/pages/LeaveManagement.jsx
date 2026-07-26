import {
  FiCalendar,
  FiUserCheck,
  FiClock,
  FiCheckCircle,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
} from "react-icons/fi";

export default function LeaveManagement({
  loading,
  overview = {},
  leaveRequests = [],
  search = "",
  onSearch,
  onRefresh,
  onApprove,
  onReject,
  onExport,
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
      title: "Pending Requests",
      value: overview.pending ?? 0,
      icon: FiClock,
      color: "bg-yellow-500",
    },
    {
      title: "Approved",
      value: overview.approved ?? 0,
      icon: FiCheckCircle,
      color: "bg-green-500",
    },
    {
      title: "Employees on Leave",
      value: overview.onLeave ?? 0,
      icon: FiUserCheck,
      color: "bg-blue-500",
    },
    {
      title: "Leave Types",
      value: overview.leaveTypes ?? 0,
      icon: FiCalendar,
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-2xl bg-white p-6 shadow-sm flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Leave Management</h2>
          <p className="text-gray-500">
            Manage leave requests, approvals, balances and calendars.
          </p>
        </div>

        <button
          onClick={onRefresh}
          className="rounded-lg border p-3 hover:bg-gray-100"
        >
          <FiRefreshCw />
        </button>
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
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-gray-500">{card.title}</p>
                  <h3 className="mt-3 text-3xl font-bold">{card.value}</h3>
                </div>

                <div className={`${card.color} rounded-xl p-3 text-white`}>
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search */}
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex gap-4">

          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />

            <input
              value={search}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Search employee or leave request..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />
          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>

          <button
            onClick={onExport}
            className="rounded-lg bg-green-600 px-5 text-white"
          >
            <FiDownload className="mr-2 inline" />
            Export
          </button>

        </div>
      </div>

      {/* Leave Requests */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Employee</th>
              <th className="p-4 text-left">Leave Type</th>
              <th className="p-4 text-left">From</th>
              <th className="p-4 text-left">To</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {leaveRequests.map((request) => (
              <tr
                key={request.id}
                className="border-t"
              >
                <td className="p-4">{request.employee}</td>
                <td className="p-4">{request.type}</td>
                <td className="p-4">{request.from}</td>
                <td className="p-4">{request.to}</td>

                <td className="p-4">
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                    {request.status}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex gap-2">

                    <button
                      onClick={() => onApprove?.(request)}
                      className="rounded bg-green-600 px-3 py-2 text-white"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => onReject?.(request)}
                      className="rounded bg-red-600 px-3 py-2 text-white"
                    >
                      Reject
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Placeholder */}
      <div className="rounded-2xl border border-dashed p-10 text-center text-gray-500">
        Leave Calendar • Leave Balances • Approval Workflow • Holiday Calendar
      </div>

    </div>
  );
}
