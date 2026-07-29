import {
  FiCalendar,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiFlag,
  FiGitBranch,
  FiClock,
  FiBarChart2,
} from "react-icons/fi";

export default function GanttMilestonesPage({
  loading,
  milestones = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
}) {

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[760px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  const statusBadge = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Delayed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">

        <div>

          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiCalendar />
            Gantt & Milestones
          </h2>

          <p className="text-gray-500">
            Visualize project schedules, dependencies and milestone progress.
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={onRefresh}
            className="rounded-lg border p-3"
          >
            <FiRefreshCw />
          </button>

          <button
            onClick={onExport}
            className="rounded-lg bg-green-600 px-5 py-3 text-white"
          >
            <FiDownload className="mr-2 inline" />
            Export
          </button>

        </div>

      </div>

      {/* Search */}

      <div className="rounded-2xl bg-white shadow-sm p-4">

        <div className="flex gap-4">

          <div className="relative flex-1">

            <FiSearch className="absolute left-3 top-3 text-gray-400" />

            <input
              value={search}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Search milestone..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>

        </div>

      </div>

      {/* Milestone Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Milestone</th>
              <th className="p-4 text-center">Project</th>
              <th className="p-4 text-center">Start</th>
              <th className="p-4 text-center">End</th>
              <th className="p-4 text-center">Progress</th>
              <th className="p-4 text-center">Status</th>
            </tr>

          </thead>

          <tbody>

            {milestones.map((item) => (

              <tr key={item.id} className="border-t">

                <td className="p-4 font-medium">
                  {item.title}
                </td>

                <td className="p-4 text-center">
                  {item.project}
                </td>

                <td className="p-4 text-center">
                  {item.startDate}
                </td>

                <td className="p-4 text-center">
                  {item.endDate}
                </td>

                <td className="p-4 text-center">
                  {item.progress}%
                </td>

                <td className="p-4 text-center">

                  <span className={`rounded-full px-3 py-1 text-sm ${statusBadge(item.status)}`}>
                    {item.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Widgets */}

      <div className="grid gap-6 xl:grid-cols-4">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiFlag className="mb-3 text-indigo-600" size={24} />
          <h3 className="font-semibold">Milestones</h3>
          <p className="mt-2 text-gray-500">
            Major delivery checkpoints.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiGitBranch className="mb-3 text-blue-600" size={24} />
          <h3 className="font-semibold">Dependencies</h3>
          <p className="mt-2 text-gray-500">
            Task relationship monitoring.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiClock className="mb-3 text-red-600" size={24} />
          <h3 className="font-semibold">Critical Path</h3>
          <p className="mt-2 text-gray-500">
            Delay-sensitive activities.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiBarChart2 className="mb-3 text-green-600" size={24} />
          <h3 className="font-semibold">Schedule Analytics</h3>
          <p className="mt-2 text-gray-500">
            Timeline and milestone performance.
          </p>
        </div>

      </div>

      {/* Gantt Placeholder */}

      <div className="rounded-2xl bg-white shadow-sm p-8">

        <h3 className="mb-4 text-lg font-semibold">
          Interactive Gantt Timeline
        </h3>

        <div className="h-96 rounded-xl border border-dashed flex items-center justify-center text-gray-400">

          Enterprise Interactive Gantt Chart

        </div>

      </div>

    </div>
  );
}
