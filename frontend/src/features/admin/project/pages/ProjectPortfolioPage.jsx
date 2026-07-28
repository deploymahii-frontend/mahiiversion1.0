import {
  FiBriefcase,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiEye,
  FiUsers,
  FiDollarSign,
  FiTrendingUp,
} from "react-icons/fi";

export default function ProjectPortfolioPage({
  loading,
  projects = [],
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
      case "Active":
        return "bg-green-100 text-green-700";
      case "On Hold":
        return "bg-orange-100 text-orange-700";
      case "Completed":
        return "bg-blue-100 text-blue-700";
      case "Cancelled":
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
            <FiBriefcase />
            Project Portfolio
          </h2>

          <p className="text-gray-500">
            Manage enterprise projects, budgets, priorities and execution.
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
            New Project
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
              placeholder="Search project..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>

        </div>

      </div>

      {/* Projects */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Project Code</th>
              <th className="p-4 text-left">Project Name</th>
              <th className="p-4 text-center">Manager</th>
              <th className="p-4 text-center">Budget</th>
              <th className="p-4 text-center">Progress</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4">Actions</th>
            </tr>

          </thead>

          <tbody>

            {projects.map((project) => (

              <tr key={project.id} className="border-t">

                <td className="p-4 font-mono">
                  {project.code}
                </td>

                <td className="p-4">
                  {project.name}
                </td>

                <td className="p-4 text-center">
                  <FiUsers className="inline mr-2" />
                  {project.manager}
                </td>

                <td className="p-4 text-center">
                  <FiDollarSign className="inline mr-2" />
                  {project.budget}
                </td>

                <td className="p-4 text-center">
                  {project.progress}%
                </td>

                <td className="p-4 text-center">

                  <span className={`rounded-full px-3 py-1 text-sm ${badge(project.status)}`}>
                    {project.status}
                  </span>

                </td>

                <td className="p-4">

                  <button
                    onClick={() => onView?.(project)}
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

      {/* Dashboard */}

      <div className="grid gap-6 xl:grid-cols-3">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiTrendingUp className="mb-3 text-blue-600" size={24} />
          <h3 className="font-semibold">Portfolio Performance</h3>
          <p className="mt-2 text-gray-500">
            Overall project delivery performance.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiDollarSign className="mb-3 text-green-600" size={24} />
          <h3 className="font-semibold">Budget Tracking</h3>
          <p className="mt-2 text-gray-500">
            Approved vs actual project spending.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiUsers className="mb-3 text-indigo-600" size={24} />
          <h3 className="font-semibold">Resource Utilization</h3>
          <p className="mt-2 text-gray-500">
            Team allocation across active projects.
          </p>
        </div>

      </div>

    </div>

  );

}
