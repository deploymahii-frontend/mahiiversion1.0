import {
  FiClock,
  FiPlay,
  FiPause,
  FiCheckCircle,
  FiRefreshCw,
  FiDownload,
  FiSearch,
  FiCalendar,
  FiEye,
  FiTrendingUp,
} from "react-icons/fi";

export default function TimeTrackingPage({
  loading,
  entries = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onStartTimer,
  onPauseTimer,
  onView,
}) {

  if (loading) {
    return (
      <div className="rounded-2xl bg-white shadow-sm p-6">
        <div className="h-[760px] animate-pulse rounded-xl bg-gray-100"/>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between">

        <div>

          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FiClock />
            Time Tracking
          </h2>

          <p className="text-gray-500">
            Track effort, billable hours, and productivity.
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={onRefresh}
            className="border rounded-lg p-3"
          >
            <FiRefreshCw/>
          </button>

          <button
            onClick={onExport}
            className="bg-green-600 text-white px-5 rounded-lg"
          >
            <FiDownload className="inline mr-2"/>
            Export
          </button>

        </div>

      </div>

      {/* Search */}

      <div className="rounded-2xl bg-white shadow-sm p-4">

        <div className="relative">

          <FiSearch className="absolute left-3 top-3 text-gray-400"/>

          <input
            value={search}
            onChange={(e)=>onSearch?.(e.target.value)}
            placeholder="Search employee or task..."
            className="w-full rounded-lg border py-2 pl-10"
          />

        </div>

      </div>

      {/* Time Entries */}

      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Employee</th>
              <th className="text-center">Project</th>
              <th className="text-center">Task</th>
              <th className="text-center">Hours</th>
              <th className="text-center">Billable</th>
              <th className="text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {entries.map(entry => (

              <tr key={entry.id} className="border-t">

                <td className="p-4 font-medium">
                  {entry.employee}
                </td>

                <td className="text-center">
                  {entry.project}
                </td>

                <td className="text-center">
                  {entry.task}
                </td>

                <td className="text-center">
                  {entry.hours}
                </td>

                <td className="text-center">
                  {entry.billable ? "Yes" : "No"}
                </td>

                <td className="text-center">

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={()=>onStartTimer?.(entry)}
                      className="border rounded p-2"
                    >
                      <FiPlay/>
                    </button>

                    <button
                      onClick={()=>onPauseTimer?.(entry)}
                      className="border rounded p-2"
                    >
                      <FiPause/>
                    </button>

                    <button
                      onClick={()=>onView?.(entry)}
                      className="border rounded p-2"
                    >
                      <FiEye/>
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* KPI */}

      <div className="grid gap-6 xl:grid-cols-4">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiClock size={24}/>
          <h3 className="mt-4 font-semibold">Total Hours</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiCalendar size={24}/>
          <h3 className="mt-4 font-semibold">Timesheets</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiCheckCircle size={24}/>
          <h3 className="mt-4 font-semibold">Billable Hours</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiTrendingUp size={24}/>
          <h3 className="mt-4 font-semibold">Productivity</h3>
        </div>

      </div>

    </div>
  );
}
