import {
  FiTool,
  FiPlus,
  FiRefreshCw,
  FiDownload,
  FiSearch,
  FiEye,
  FiTruck,
  FiCalendar,
  FiAlertTriangle,
} from "react-icons/fi";

export default function VehicleMaintenancePage({
  loading,
  services = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreateService,
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
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Scheduled":
        return "bg-blue-100 text-blue-700";
      case "In Service":
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
            Vehicle Maintenance
          </h2>

          <p className="text-gray-500">
            Manage servicing, repairs, inspections, and maintenance lifecycle for fleet vehicles.
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
            onClick={onCreateService}
            className="bg-indigo-600 text-white px-5 rounded-lg"
          >
            <FiPlus className="inline mr-2"/>
            Schedule Service
          </button>

        </div>

      </div>

      {/* Search */}

      <div className="rounded-2xl bg-white shadow-sm p-4">

        <div className="relative">
          <FiSearch className="absolute left-3 top-3 text-gray-400"/>
          <input
            className="w-full rounded-lg border py-2 pl-10"
            placeholder="Search maintenance records..."
            value={search}
            onChange={(e)=>onSearch?.(e.target.value)}
          />
        </div>

      </div>

      {/* Table */}

      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Vehicle</th>
              <th className="text-center">Service Type</th>
              <th className="text-center">Next Service</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>

            {services.map(service => (

              <tr key={service.id} className="border-t">

                <td className="p-4 font-medium">
                  <FiTruck className="inline mr-2"/>
                  {service.vehicle}
                </td>

                <td className="text-center">
                  {service.type}
                </td>

                <td className="text-center">
                  <FiCalendar className="inline mr-1"/>
                  {service.nextService}
                </td>

                <td className="text-center">
                  <span className={`rounded-full px-3 py-1 ${badge(service.status)}`}>
                    {service.status}
                  </span>
                </td>

                <td className="text-center">
                  <button
                    onClick={() => onView?.(service)}
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

      {/* KPI Cards */}

      <div className="grid gap-6 xl:grid-cols-4">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiTool size={24}/>
          <h3 className="mt-4 font-semibold">Scheduled Services</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiCalendar size={24}/>
          <h3 className="mt-4 font-semibold">Upcoming Services</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiAlertTriangle size={24}/>
          <h3 className="mt-4 font-semibold">Overdue Services</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiTruck size={24}/>
          <h3 className="mt-4 font-semibold">Vehicles Under Repair</h3>
        </div>

      </div>

    </div>
  );
}
