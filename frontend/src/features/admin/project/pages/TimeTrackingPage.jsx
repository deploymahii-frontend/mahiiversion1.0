import {
  FiClock,
  FiPlay,
  FiPause,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiCheckCircle,
  FiCalendar,
  FiDollarSign,
} from "react-icons/fi";

export default function TimeTrackingPage({
  loading,
  timesheets = [],
  search = "",
  timerRunning = false,
  onSearch,
  onRefresh,
  onExport,
  onStartTimer,
  onStopTimer,
  onApprove,
}) {

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[760px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  const badge = (status) => {
    switch (status) {
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Submitted":
        return "bg-blue-100 text-blue-700";
      case "Draft":
        return "bg-yellow-100 text-yellow-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (

    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">

        <div>

          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiClock />
            Time Tracking
          </h2>

          <p className="text-gray-500">
            Record working hours, manage timesheets and monitor productivity.
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

          {timerRunning ? (

            <button
              onClick={onStopTimer}
              className="rounded-lg bg-red-600 px-5 py-3 text-white"
            >
              <FiPause className="mr-2 inline" />
              Stop Timer
            </button>

          ) : (

            <button
              onClick={onStartTimer}
              className="rounded-lg bg-indigo-600 px-5 py-3 text-white"
            >
              <FiPlay className="mr-2 inline" />
              Start Timer
            </button>

          )}

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
              placeholder="Search timesheet..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>

        </div>

      </div>

      {/* Timesheet Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Employee</th>
              <th className="p-4 text-center">Project</th>
              <th className="p-4 text-center">Task</th>
              <th className="p-4 text-center">Hours</th>
              <th className="p-4 text-center">Billable</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4">Actions</th>
            </tr>

          </thead>

          <tbody>

            {timesheets.map((entry) => (

              <tr key={entry.id} className="border-t">

                <td className="p-4">{entry.employee}</td>

                <td className="p-4 text-center">{entry.project}</td>

                <td className="p-4 text-center">{entry.task}</td>

                <td className="p-4 text-center">
                  {entry.hours}
                </td>

                <td className="p-4 text-center">

                  {entry.billable ? "Yes" : "No"}

                </td>

                <td className="p-4 text-center">

                  <span className={`rounded-full px-3 py-1 text-sm ${badge(entry.status)}`}>
                    {entry.status}
                  </span>

                </td>

                <td className="p-4">

                  {entry.status !== "Approved" && (

                    <button
                      onClick={() => onApprove?.(entry)}
                      className="rounded border p-2"
                    >
                      <FiCheckCircle />
                    </button>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Widgets */}

      <div className="grid gap-6 xl:grid-cols-3">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiClock className="mb-3 text-indigo-600" size={24} />
          <h3 className="font-semibold">Today's Hours</h3>
          <p className="mt-2 text-gray-500">
            Daily work summary.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiCalendar className="mb-3 text-blue-600" size={24} />
          <h3 className="font-semibold">Weekly Timesheet</h3>
          <p className="mt-2 text-gray-500">
            Weekly logged hours.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiDollarSign className="mb-3 text-green-600" size={24} />
          <h3 className="font-semibold">Labor Cost</h3>
          <p className="mt-2 text-gray-500">
            Billable hours and project costs.
          </p>
        </div>

      </div>

    </div>

  );
}
