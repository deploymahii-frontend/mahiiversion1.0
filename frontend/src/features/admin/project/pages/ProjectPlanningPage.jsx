import {
  FiCalendar,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiEye,
  FiFlag,
  FiClock,
  FiTarget,
} from "react-icons/fi";

export default function ProjectPlanningPage({
  loading,
  plans = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreate,
  onView,
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
      case "Planning":
        return "bg-yellow-100 text-yellow-700";
      case "Approved":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Completed":
        return "bg-indigo-100 text-indigo-700";
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
            <FiCalendar />
            Project Planning
          </h2>

          <p className="text-gray-500">
            Define schedules, milestones, dependencies and execution plans.
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

          <button
            onClick={onCreate}
            className="rounded-lg bg-indigo-600 px-5 py-3 text-white"
          >
            <FiPlus className="mr-2 inline" />
            New Plan
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
              placeholder="Search project plan..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>

        </div>

      </div>

      {/* Planning Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Project</th>
              <th className="p-4 text-center">Start Date</th>
              <th className="p-4 text-center">End Date</th>
              <th className="p-4 text-center">Milestones</th>
              <th className="p-4 text-center">Progress</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4">Actions</th>
            </tr>

          </thead>

          <tbody>

            {plans.map((plan) => (

              <tr key={plan.id} className="border-t">

                <td className="p-4">
                  {plan.project}
                </td>

                <td className="p-4 text-center">
                  {plan.startDate}
                </td>

                <td className="p-4 text-center">
                  {plan.endDate}
                </td>

                <td className="p-4 text-center">
                  <FiFlag className="inline mr-2" />
                  {plan.milestones}
                </td>

                <td className="p-4 text-center">
                  {plan.progress}%
                </td>

                <td className="p-4 text-center">

                  <span className={`rounded-full px-3 py-1 text-sm ${badge(plan.status)}`}>
                    {plan.status}
                  </span>

                </td>

                <td className="p-4">

                  <button
                    onClick={() => onView?.(plan)}
                    className="rounded border p-2"
                  >
                    <FiEye />
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Planning Widgets */}

      <div className="grid gap-6 xl:grid-cols-3">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiFlag className="mb-3 text-indigo-600" size={24}/>
          <h3 className="font-semibold">Milestone Tracking</h3>
          <p className="mt-2 text-gray-500">
            Track project milestones and deadlines.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiClock className="mb-3 text-blue-600" size={24}/>
          <h3 className="font-semibold">Schedule Management</h3>
          <p className="mt-2 text-gray-500">
            Monitor baseline vs actual schedules.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiTarget className="mb-3 text-green-600" size={24}/>
          <h3 className="font-semibold">Capacity Planning</h3>
          <p className="mt-2 text-gray-500">
            Balance workload across project teams.
          </p>
        </div>

      </div>

    </div>
  );

}