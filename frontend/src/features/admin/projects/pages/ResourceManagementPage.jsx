import {
  FiUsers,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiSearch,
  FiCalendar,
  FiBriefcase,
  FiTrendingUp,
  FiEye,
} from "react-icons/fi";

export default function ResourceManagementPage({
  loading,
  resources = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onAddResource,
  onView,
}) {

  if (loading) {
    return (
      <div className="rounded-2xl bg-white shadow-sm p-6">
        <div className="h-[760px] animate-pulse rounded-xl bg-gray-100"/>
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
            Resource Management
          </h2>

          <p className="text-gray-500">
            Allocate people and assets efficiently across enterprise projects.
          </p>
        </div>

        <div className="flex gap-3">

          <button onClick={onRefresh} className="border rounded-lg p-3">
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
            onClick={onAddResource}
            className="bg-indigo-600 text-white px-5 rounded-lg"
          >
            <FiPlus className="inline mr-2"/>
            Add Resource
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
            placeholder="Search resources..."
            className="w-full rounded-lg border py-2 pl-10"
          />

        </div>

      </div>

      {/* Resource Table */}

      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Resource</th>
              <th className="text-center">Role</th>
              <th className="text-center">Project</th>
              <th className="text-center">Availability</th>
              <th className="text-center">Utilization</th>
              <th className="text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {resources.map(resource => (

              <tr key={resource.id} className="border-t">

                <td className="p-4 font-medium">
                  {resource.name}
                </td>

                <td className="text-center">
                  <FiBriefcase className="inline mr-1"/>
                  {resource.role}
                </td>

                <td className="text-center">
                  {resource.project}
                </td>

                <td className="text-center">
                  <FiCalendar className="inline mr-1"/>
                  {resource.availability}
                </td>

                <td className="text-center">

                  <span className={`rounded-full px-3 py-1 ${utilizationBadge(resource.utilization)}`}>
                    {resource.utilization}%
                  </span>

                </td>

                <td className="text-center">

                  <button
                    onClick={()=>onView?.(resource)}
                    className="border rounded p-2"
                  >
                    <FiEye/>
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Dashboard */}

      <div className="grid gap-6 xl:grid-cols-4">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiUsers size={24}/>
          <h3 className="mt-4 font-semibold">Resource Pool</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiTrendingUp size={24}/>
          <h3 className="mt-4 font-semibold">Utilization</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiCalendar size={24}/>
          <h3 className="mt-4 font-semibold">Capacity Planning</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiBriefcase size={24}/>
          <h3 className="mt-4 font-semibold">Skills Matrix</h3>
        </div>

      </div>

    </div>
  );
}
