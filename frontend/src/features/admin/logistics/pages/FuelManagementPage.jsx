import {
  FiDroplet,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiEye,
  FiTrendingUp,
  FiTruck,
  FiCreditCard,
} from "react-icons/fi";

export default function FuelManagementPage({
  loading,
  fuelLogs = [],
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

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">

        <div>

          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiDroplet />
            Fuel Management
          </h2>

          <p className="text-gray-500">
            Track fuel usage, expenses and vehicle fuel efficiency.
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
            Add Fuel Entry
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
              placeholder="Search fuel log..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>

        </div>

      </div>

      {/* Fuel Logs */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Vehicle</th>
              <th className="p-4 text-left">Driver</th>
              <th className="p-4 text-center">Fuel (L)</th>
              <th className="p-4 text-center">Amount</th>
              <th className="p-4 text-center">Mileage</th>
              <th className="p-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

            {fuelLogs.map((fuel) => (

              <tr
                key={fuel.id}
                className="border-t"
              >

                <td className="p-4">
                  <FiTruck className="inline mr-2" />
                  {fuel.vehicle}
                </td>

                <td className="p-4">
                  {fuel.driver}
                </td>

                <td className="p-4 text-center">
                  {fuel.liters}
                </td>

                <td className="p-4 text-center">
                  {fuel.amount}
                </td>

                <td className="p-4 text-center">
                  <FiTrendingUp className="inline mr-2" />
                  {fuel.mileage}
                </td>

                <td className="p-4">

                  <button
                    onClick={() => onView?.(fuel)}
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

      {/* Analytics */}

      <div className="grid gap-6 xl:grid-cols-3">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiDroplet className="mb-3 text-blue-600" size={24} />
          <h3 className="font-semibold">Fuel Consumption</h3>
          <p className="mt-2 text-gray-500">
            Vehicle-wise fuel utilization analysis.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiCreditCard className="mb-3 text-green-600" size={24} />
          <h3 className="font-semibold">Fuel Card Usage</h3>
          <p className="mt-2 text-gray-500">
            Company fuel card transactions and limits.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiTrendingUp className="mb-3 text-indigo-600" size={24} />
          <h3 className="font-semibold">Mileage Analytics</h3>
          <p className="mt-2 text-gray-500">
            KM/L efficiency and fuel cost trends.
          </p>
        </div>

      </div>

    </div>
  );
}