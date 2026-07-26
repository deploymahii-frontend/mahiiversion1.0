import {
  FiUser,
  FiPlus,
  FiRefreshCw,
  FiDownload,
  FiSearch,
  FiEye,
  FiTruck,
  FiShield,
  FiCalendar,
} from "react-icons/fi";

export default function DriverManagementPage({
  loading,
  drivers = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreateDriver,
  onView,
}) {

  if (loading) {
    return (
      <div className="rounded-2xl bg-white shadow-sm p-6">
        <div className="h-[760px] rounded-xl bg-gray-100 animate-pulse" />
      </div>
    );
  }

  const badge = (status) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-700";
      case "On Duty":
        return "bg-blue-100 text-blue-700";
      case "On Leave":
        return "bg-yellow-100 text-yellow-700";
      case "Suspended":
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
            <FiUser />
            Driver Management
          </h2>

          <p className="text-gray-500">
            Manage enterprise drivers, licenses, compliance, scheduling, and assignments.
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
            onClick={onCreateDriver}
            className="bg-indigo-600 text-white px-5 rounded-lg"
          >
            <FiPlus className="inline mr-2"/>
            New Driver
          </button>

        </div>

      </div>

      {/* Search */}

      <div className="rounded-2xl bg-white shadow-sm p-4">

        <div className="relative">

          <FiSearch className="absolute left-3 top-3 text-gray-400"/>

          <input
            className="w-full rounded-lg border py-2 pl-10"
            placeholder="Search drivers..."
            value={search}
            onChange={(e)=>onSearch?.(e.target.value)}
          />

        </div>

      </div>

      {/* Driver Table */}

      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Driver</th>
              <th className="text-center">License</th>
              <th className="text-center">Assigned Vehicle</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>

            {drivers.map(driver => (

              <tr key={driver.id} className="border-t">

                <td className="p-4 font-medium">
                  {driver.name}
                </td>

                <td className="text-center">
                  {driver.license}
                </td>

                <td className="text-center">
                  <FiTruck className="inline mr-1"/>
                  {driver.vehicle}
                </td>

                <td className="text-center">
                  <span className={`rounded-full px-3 py-1 ${badge(driver.status)}`}>
                    {driver.status}
                  </span>
                </td>

                <td className="text-center">

                  <button
                    onClick={() => onView?.(driver)}
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
          <FiUser size={24}/>
          <h3 className="mt-4 font-semibold">Drivers</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiTruck size={24}/>
          <h3 className="mt-4 font-semibold">Assigned Vehicles</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiShield size={24}/>
          <h3 className="mt-4 font-semibold">License Compliance</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiCalendar size={24}/>
          <h3 className="mt-4 font-semibold">Shift Schedule</h3>
        </div>

      </div>

    </div>
  );
}
