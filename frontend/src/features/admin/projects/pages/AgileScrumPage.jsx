import {
  FiLayers,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiUsers,
  FiClipboard,
  FiTrendingUp,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";

export default function AgileScrumPage({
  loading,
  sprints = [],
  onRefresh,
  onExport,
  onCreateSprint,
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

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between">

        <div>

          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FiLayers />
            Agile & Scrum
          </h2>

          <p className="text-gray-500">
            Sprint planning, backlog management, and Agile delivery.
          </p>

        </div>

        <div className="flex gap-3">

          <button
            onClick={onRefresh}
            className="border rounded-lg p-3"
          >
            <FiRefreshCw />
          </button>

          <button
            onClick={onExport}
            className="bg-green-600 text-white px-5 rounded-lg"
          >
            <FiDownload className="inline mr-2"/>
            Export
          </button>

          <button
            onClick={onCreateSprint}
            className="bg-indigo-600 text-white px-5 rounded-lg"
          >
            <FiPlus className="inline mr-2"/>
            New Sprint
          </button>

        </div>

      </div>

      <div className="grid gap-6 xl:grid-cols-4">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiClipboard size={24}/>
          <h3 className="mt-4 font-semibold">Product Backlog</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiLayers size={24}/>
          <h3 className="mt-4 font-semibold">Sprint Backlog</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiUsers size={24}/>
          <h3 className="mt-4 font-semibold">Team Velocity</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiTrendingUp size={24}/>
          <h3 className="mt-4 font-semibold">Burndown</h3>
        </div>

      </div>

      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">Sprint</th>
              <th className="text-center">Duration</th>
              <th className="text-center">Story Points</th>
              <th className="text-center">Completed</th>
              <th className="text-center">Velocity</th>

            </tr>

          </thead>

          <tbody>

            {sprints.map((sprint)=>(
              <tr
                key={sprint.id}
                className="border-t"
              >

                <td className="p-4 font-medium">
                  {sprint.name}
                </td>

                <td className="text-center">
                  {sprint.duration}
                </td>

                <td className="text-center">
                  {sprint.storyPoints}
                </td>

                <td className="text-center">
                  <FiCheckCircle className="inline mr-1"/>
                  {sprint.completed}
                </td>

                <td className="text-center">
                  <FiClock className="inline mr-1"/>
                  {sprint.velocity}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
