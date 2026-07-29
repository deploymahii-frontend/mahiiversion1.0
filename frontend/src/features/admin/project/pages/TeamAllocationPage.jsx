import {
  FiUsers,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiEye,
  FiBriefcase,
  FiClock,
  FiBarChart2,
} from "react-icons/fi";

export default function TeamAllocationPage({
  loading,
  allocations = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onAssign,
  onView,
}) {

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[760px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  const utilizationBadge = (value) => {
    if (value >= 90) return "bg-red-100 text-red-700";
    if (value >= 70) return "bg-yellow-100 text-yellow-700";
    return "bg-green-100 text-green-700";
  };

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">

        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiUsers />
            Team Allocation
          </h2>

          <p className="text-gray-500">
            Allocate resources across projects based on skills and availability.
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
            onClick={onAssign}
            className="rounded-lg bg-indigo-600 px-5 py-3 text-white"
          >
            <FiPlus className="mr-2 inline" />
            Assign Resource
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
              placeholder="Search employee or project..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>

        </div>

      </div>

      {/* Allocation Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Employee</th>
              <th className="p-4 text-center">Project</th>
              <th className="p-4 text-center">Role</th>
              <th className="p-4 text-center">Allocation</th>
              <th className="p-4 text-center">Utilization</th>
              <th className="p-4 text-center">Availability</th>
              <th className="p-4">Actions</th>
            </tr>

          </thead>

          <tbody>

            {allocations.map((item) => (

              <tr key={item.id} className="border-t">

                <td className="p-4 font-medium">
                  {item.employee}
                </td>

                <td className="p-4 text-center">
                  <FiBriefcase className="inline mr-2" />
                  {item.project}
                </td>

                <td className="p-4 text-center">
                  {item.role}
                </td>

                <td className="p-4 text-center">
                  {item.allocation}%
                </td>

                <td className="p-4 text-center">

                  <span className={`rounded-full px-3 py-1 text-sm ${utilizationBadge(item.utilization)}`}>
                    {item.utilization}%
                  </span>

                </td>

                <td className="p-4 text-center">
                  <FiClock className="inline mr-2" />
                  {item.availability}
                </td>

                <td className="p-4">

                  <button
                    onClick={() => onView?.(item)}
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

      {/* Resource Widgets */}

      <div className="grid gap-6 xl:grid-cols-3">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiUsers className="mb-3 text-indigo-600" size={24} />
          <h3 className="font-semibold">Resource Capacity</h3>
          <p className="mt-2 text-gray-500">
            Overall workforce allocation.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiClock className="mb-3 text-blue-600" size={24} />
          <h3 className="font-semibold">Availability Calendar</h3>
          <p className="mt-2 text-gray-500">
            Employee availability across projects.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiBarChart2 className="mb-3 text-green-600" size={24} />
          <h3 className="font-semibold">Utilization Analytics</h3>
          <p className="mt-2 text-gray-500">
            Monitor workload and optimize resource allocation.
          </p>
        </div>

      </div>

    </div>
  );
}
