import {
  FiFlag,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiSearch,
  FiEye,
  FiCalendar,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";

export default function MilestoneManagementPage({
  loading,
  milestones = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreateMilestone,
  onView,
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
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Upcoming":
        return "bg-blue-100 text-blue-700";
      case "Delayed":
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

          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiFlag />
            Milestone Management
          </h2>

          <p className="text-gray-500">
            Track key project delivery checkpoints and stage gates.
          </p>

        </div>

        <div className="flex gap-3">

          <button onClick={onRefresh} className="border rounded-lg p-3">
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
            onClick={onCreateMilestone}
            className="bg-indigo-600 text-white px-5 rounded-lg"
          >
            <FiPlus className="inline mr-2"/>
            New Milestone
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
            placeholder="Search milestones..."
            className="w-full rounded-lg border py-2 pl-10"
          />

        </div>

      </div>

      {/* Milestone Register */}

      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Milestone</th>
              <th className="text-center">Project</th>
              <th className="text-center">Target Date</th>
              <th className="text-center">Actual Date</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {milestones.map(item => (

              <tr key={item.id} className="border-t">

                <td className="p-4 font-medium">
                  {item.name}
                </td>

                <td className="text-center">
                  {item.project}
                </td>

                <td className="text-center">
                  {item.targetDate}
                </td>

                <td className="text-center">
                  {item.actualDate || "-"}
                </td>

                <td className="text-center">
                  <span className={`rounded-full px-3 py-1 ${badge(item.status)}`}>
                    {item.status}
                  </span>
                </td>

                <td className="text-center">
                  <button
                    onClick={() => onView?.(item)}
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

      {/* KPI */}

      <div className="grid gap-6 xl:grid-cols-4">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiFlag size={24}/>
          <h3 className="mt-4 font-semibold">Milestones</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiCheckCircle size={24}/>
          <h3 className="mt-4 font-semibold">Completed</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiClock size={24}/>
          <h3 className="mt-4 font-semibold">Delayed</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiCalendar size={24}/>
          <h3 className="mt-4 font-semibold">Upcoming</h3>
        </div>

      </div>

    </div>
  );
}
