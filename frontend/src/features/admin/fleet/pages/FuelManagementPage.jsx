import {
  FiDroplet,
  FiPlus,
  FiRefreshCw,
  FiDownload,
  FiSearch,
  FiEye,
  FiTruck,
  FiDollarSign,
  FiTrendingUp,
} from "react-icons/fi";

export default function FuelManagementPage({
  loading,
  fuelLogs = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onAddFuelLog,
  onView,
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

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between">

        <div>

          <h2 className="text-2xl font-bold flex items-center gap-2">
            <FiDroplet />
            Fuel Management
          </h2>

          <p className="text-gray-500">
            Track fuel usage, fuel costs, mileage, and fleet fuel efficiency.
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
            onClick={onAddFuelLog}
            className="bg-indigo-600 text-white px-5 rounded-lg"
          >
            <FiPlus className="inline mr-2"/>
            Add Fuel Entry
          </button>

        </div>

      </div>

      {/* Search */}

      <div className="rounded-2xl bg-white shadow-sm p-4">

        <div className="relative">

          <FiSearch className="absolute left-3 top-3 text-gray-400"/>

          <input
            className="w-full rounded-lg border py-2 pl-10"
            placeholder="Search fuel logs..."
            value={search}
            onChange={(e)=>onSearch?.(e.target.value)}
          />

        </div>

      </div>

      {/* Fuel Table */}

      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Vehicle</th>
              <th className="text-center">Fuel (L)</th>
              <th className="text-center">Cost</th>
              <th className="text-center">Mileage</th>
              <th className="text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {fuelLogs.map(log => (

              <tr key={log.id} className="border-t">

                <td className="p-4 font-medium">
                  <FiTruck className="inline mr-2"/>
                  {log.vehicle}
                </td>

                <td className="text-center">
                  {log.liters} L
                </td>

                <td className="text-center">
                  ₹{log.cost}
                </td>

                <td className="text-center">
                  {log.mileage} km/L
                </td>

                <td className="text-center">

                  <button
                    onClick={() => onView?.(log)}
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
          <FiDroplet size={24}/>
          <h3 className="mt-4 font-semibold">Fuel Consumed</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiDollarSign size={24}/>
          <h3 className="mt-4 font-semibold">Fuel Cost</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiTrendingUp size={24}/>
          <h3 className="mt-4 font-semibold">Average Mileage</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiTruck size={24}/>
          <h3 className="mt-4 font-semibold">Fuel Efficiency</h3>
        </div>

      </div>

    </div>
  );
}
