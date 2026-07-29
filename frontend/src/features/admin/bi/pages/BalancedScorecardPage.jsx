import {
  FiTarget,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiEye,
  FiTrendingUp,
  FiFlag,
  FiCheckCircle,
} from "react-icons/fi";

export default function BalancedScorecardPage({
  loading,
  objectives = [],
  onRefresh,
  onExport,
  onCreateObjective,
  onView,
}) {

  if (loading) {
    return (
      <div className="rounded-2xl bg-white shadow-sm p-6">
        <div className="h-[760px] rounded-xl bg-gray-100 animate-pulse"/>
      </div>
    );
  }

  const badge = (status) => {
    switch (status) {
      case "On Track":
        return "bg-green-100 text-green-700";
      case "At Risk":
        return "bg-yellow-100 text-yellow-700";
      case "Off Track":
        return "bg-red-100 text-red-700";
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
            <FiTarget />
            Balanced Scorecards
          </h2>

          <p className="text-gray-500">
            Align enterprise strategy with measurable execution.
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
            onClick={onCreateObjective}
            className="bg-indigo-600 text-white px-5 rounded-lg"
          >
            <FiPlus className="inline mr-2"/>
            New Objective
          </button>

        </div>

      </div>

      {/* Strategic Objectives */}

      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Objective</th>
              <th className="text-center">Perspective</th>
              <th className="text-center">Owner</th>
              <th className="text-center">Progress</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>

            {objectives.map((objective) => (

              <tr key={objective.id} className="border-t">

                <td className="p-4 font-medium">
                  {objective.title}
                </td>

                <td className="text-center">
                  {objective.perspective}
                </td>

                <td className="text-center">
                  {objective.owner}
                </td>

                <td className="text-center">
                  {objective.progress}%
                </td>

                <td className="text-center">

                  <span className={`rounded-full px-3 py-1 ${badge(objective.status)}`}>
                    {objective.status}
                  </span>

                </td>

                <td className="text-center">

                  <button
                    onClick={() => onView?.(objective)}
                    className="border rounded p-2"
                  >
                    <FiEye />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Strategy Summary */}

      <div className="grid gap-6 xl:grid-cols-4">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiTarget size={24}/>
          <h3 className="mt-4 font-semibold">Strategic Objectives</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiTrendingUp size={24}/>
          <h3 className="mt-4 font-semibold">KPI Alignment</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiFlag size={24}/>
          <h3 className="mt-4 font-semibold">Strategic Initiatives</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiCheckCircle size={24}/>
          <h3 className="mt-4 font-semibold">Overall Performance</h3>
        </div>

      </div>

    </div>
  );
}
