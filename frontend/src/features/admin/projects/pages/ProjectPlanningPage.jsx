import {
  FiClipboard,
  FiPlus,
  FiRefreshCw,
  FiDownload,
  FiCalendar,
  FiUsers,
  FiFlag,
  FiDollarSign,
  FiEye,
  FiEdit,
} from "react-icons/fi";

export default function ProjectPlanningPage({
  loading,
  projects = [],
  onRefresh,
  onExport,
  onCreate,
  onView,
  onEdit,
}) {

  if (loading) {
    return (
      <div className="rounded-2xl bg-white shadow-sm p-6">
        <div className="h-[760px] animate-pulse rounded-xl bg-gray-100"/>
      </div>
    );
  }

  const badge = (status) => {
    switch (status) {
      case "Planning":
        return "bg-blue-100 text-blue-700";
      case "Approved":
        return "bg-green-100 text-green-700";
      case "On Hold":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (

    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between">

        <div>

          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FiClipboard />
            Project Planning
          </h2>

          <p className="text-gray-500">
            Define project scope, schedule, ownership, and objectives.
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

          <button
            onClick={onCreate}
            className="bg-indigo-600 text-white px-5 rounded-lg"
          >
            <FiPlus className="inline mr-2"/>
            New Project
          </button>

        </div>

      </div>

      {/* KPI */}

      <div className="grid gap-6 xl:grid-cols-4">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiClipboard size={26}/>
          <h3 className="mt-4 font-semibold">Projects</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiCalendar size={26}/>
          <h3 className="mt-4 font-semibold">Schedules</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiUsers size={26}/>
          <h3 className="mt-4 font-semibold">Project Owners</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiDollarSign size={26}/>
          <h3 className="mt-4 font-semibold">Planned Budget</h3>
        </div>

      </div>

      {/* Projects */}

      <div className="rounded-2xl overflow-hidden bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">Project</th>
              <th className="text-center">Manager</th>
              <th className="text-center">Start</th>
              <th className="text-center">End</th>
              <th className="text-center">Budget</th>
              <th className="text-center">Status</th>
              <th className="text-center">Action</th>

            </tr>

          </thead>

          <tbody>

            {projects.map(project=>(

              <tr
                key={project.id}
                className="border-t"
              >

                <td className="p-4 font-medium">
                  {project.name}
                </td>

                <td className="text-center">
                  {project.manager}
                </td>

                <td className="text-center">
                  {project.start}
                </td>

                <td className="text-center">
                  {project.end}
                </td>

                <td className="text-center">
                  {project.budget}
                </td>

                <td className="text-center">

                  <span className={`rounded-full px-3 py-1 ${badge(project.status)}`}>
                    {project.status}
                  </span>

                </td>

                <td className="text-center">

                  <div className="flex justify-center gap-2">

                    <button
                      onClick={()=>onView?.(project)}
                      className="border rounded p-2"
                    >
                      <FiEye/>
                    </button>

                    <button
                      onClick={()=>onEdit?.(project)}
                      className="border rounded p-2"
                    >
                      <FiEdit/>
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}
