import {
  FiCalendar,
  FiRefreshCw,
  FiDownload,
  FiFilter,
  FiZoomIn,
  FiZoomOut,
  FiFlag,
  FiLink,
  FiClock,
} from "react-icons/fi";

export default function GanttChartPage({
  loading,
  tasks = [],
  onRefresh,
  onExport,
  onFilter,
  onZoomIn,
  onZoomOut,
}) {

  if (loading) {
    return (
      <div className="rounded-2xl bg-white shadow-sm p-6">
        <div className="h-[760px] rounded-xl bg-gray-100 animate-pulse"/>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">

        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiCalendar />
            Gantt Chart
          </h2>

          <p className="text-gray-500">
            Interactive project schedule with dependencies and milestones.
          </p>
        </div>

        <div className="flex gap-3">

          <button onClick={onRefresh} className="border rounded-lg p-3">
            <FiRefreshCw/>
          </button>

          <button onClick={onFilter} className="border rounded-lg p-3">
            <FiFilter/>
          </button>

          <button onClick={onZoomOut} className="border rounded-lg p-3">
            <FiZoomOut/>
          </button>

          <button onClick={onZoomIn} className="border rounded-lg p-3">
            <FiZoomIn/>
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

      {/* Timeline */}

      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Task</th>
              <th className="text-center">Start</th>
              <th className="text-center">Finish</th>
              <th className="text-center">Progress</th>
              <th className="text-center">Dependency</th>
              <th className="text-center">Milestone</th>
            </tr>

          </thead>

          <tbody>

            {tasks.map(task => (

              <tr key={task.id} className="border-t">

                <td className="p-4 font-medium">
                  {task.name}
                </td>

                <td className="text-center">
                  {task.start}
                </td>

                <td className="text-center">
                  {task.finish}
                </td>

                <td className="text-center">
                  {task.progress}%
                </td>

                <td className="text-center">
                  <FiLink className="inline mr-1"/>
                  {task.dependency || "-"}
                </td>

                <td className="text-center">
                  {task.milestone && (
                    <FiFlag className="inline text-orange-500"/>
                  )}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* KPI */}

      <div className="grid gap-6 xl:grid-cols-4">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiCalendar size={24}/>
          <h3 className="mt-4 font-semibold">Timeline</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiLink size={24}/>
          <h3 className="mt-4 font-semibold">Dependencies</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiFlag size={24}/>
          <h3 className="mt-4 font-semibold">Milestones</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiClock size={24}/>
          <h3 className="mt-4 font-semibold">Critical Path</h3>
        </div>

      </div>

    </div>
  );
}
