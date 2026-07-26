import {
  FiLogOut,
  FiClipboard,
  FiMonitor,
  FiShield,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiEye,
  FiCheckCircle,
} from "react-icons/fi";

export default function ExitManagement({
  loading,
  overview = {},
  exits = [],
  search = "",
  onSearch,
  onRefresh,
  onView,
  onComplete,
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
      title: "Pending Exits",
      value: overview.pending ?? 0,
      icon: FiLogOut,
      color: "bg-red-500",
    },
    {
      title: "Completed",
      value: overview.completed ?? 0,
      icon: FiCheckCircle,
      color: "bg-green-500",
    },
    {
      title: "Assets Pending",
      value: overview.assetsPending ?? 0,
      icon: FiMonitor,
      color: "bg-yellow-500",
    },
    {
      title: "Clearances",
      value: overview.clearances ?? 0,
      icon: FiClipboard,
      color: "bg-blue-500",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">
            Exit Management
          </h2>

          <p className="text-gray-500">
            Manage resignations, offboarding, clearances and settlements.
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
              className="rounded-2xl bg-white shadow-sm p-5"
            >
              <div className="flex justify-between">
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

      {/* Search */}
      <div className="rounded-2xl bg-white shadow-sm p-4">
        <div className="flex gap-4">

          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />

            <input
              value={search}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Search employee..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />
          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>

        </div>
      </div>

      {/* Exit Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Employee</th>
              <th className="p-4 text-left">Department</th>
              <th className="p-4 text-left">Last Working Day</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">IT Clearance</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {exits.map((exit) => (
              <tr
                key={exit.id}
                className="border-t"
              >
                <td className="p-4">{exit.employee}</td>
                <td className="p-4">{exit.department}</td>
                <td className="p-4">{exit.lastWorkingDay}</td>

                <td className="p-4">
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                    {exit.status}
                  </span>
                </td>

                <td className="p-4">
                  <span className="flex items-center gap-2">
                    <FiShield />
                    {exit.itClearance}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex gap-2">

                    <button
                      onClick={() => onView?.(exit)}
                      className="rounded border p-2"
                    >
                      <FiEye />
                    </button>

                    <button
                      onClick={() => onComplete?.(exit)}
                      className="rounded bg-green-600 px-3 py-2 text-white"
                    >
                      Complete
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
        Resignation Workflow • Exit Checklist • Asset Return • Final Settlement • Exit Interview • Experience Letter
      </div>

    </div>
  );
}
