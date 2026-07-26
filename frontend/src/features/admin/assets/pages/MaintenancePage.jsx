import {
  FiTool,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiSearch,
  FiEye,
  FiClock,
  FiUser,
  FiCheckCircle,
} from "react-icons/fi";

export default function MaintenancePage({
  loading,
  maintenanceJobs = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreateJob,
  onView,
}) {

  if (loading) {
    return (
      <div className="rounded-2xl bg-white shadow-sm p-6">
        <div className="h-[760px] rounded-xl bg-gray-100 animate-pulse"/>
      </div>
    );
  }

  const badgeClass = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Overdue":
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
            <FiTool />
            Maintenance Management
          </h2>

          <p className="text-gray-500">
            Manage corrective and preventive maintenance for enterprise assets.
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
            onClick={onCreateJob}
            className="bg-indigo-600 text-white px-5 rounded-lg"
          >
            <FiPlus className="inline mr-2"/>
            New Maintenance
          </button>

        </div>

      </div>

      {/* Search */}

      <div className="rounded-2xl bg-white shadow-sm p-4">

        <div className="relative">

          <FiSearch className="absolute left-3 top-3 text-gray-400"/>

          <input
            className="w-full rounded-lg border py-2 pl-10"
            placeholder="Search maintenance jobs..."
            value={search}
            onChange={(e)=>onSearch?.(e.target.value)}
          />

        </div>

      </div>

      {/* Jobs */}

      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Asset</th>
              <th className="text-center">Technician</th>
              <th className="text-center">Due Date</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>

            {maintenanceJobs.map(job => (

              <tr key={job.id} className="border-t">

                <td className="p-4 font-medium">
                  {job.asset}
                </td>

                <td className="text-center">
                  <FiUser className="inline mr-1"/>
                  {job.technician}
                </td>

                <td className="text-center">
                  <FiClock className="inline mr-1"/>
                  {job.dueDate}
                </td>

                <td className="text-center">
                  <span className={`rounded-full px-3 py-1 ${badgeClass(job.status)}`}>
                    {job.status}
                  </span>
                </td>

                <td className="text-center">
                  <button
                    onClick={() => onView?.(job)}
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

      {/* KPIs */}

      <div className="grid gap-6 xl:grid-cols-4">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiTool size={24}/>
          <h3 className="mt-4 font-semibold">Open Jobs</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiClock size={24}/>
          <h3 className="mt-4 font-semibold">Downtime</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiUser size={24}/>
          <h3 className="mt-4 font-semibold">Technicians</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiCheckCircle size={24}/>
          <h3 className="mt-4 font-semibold">Completed</h3>
        </div>

      </div>

    </div>
  );
}
