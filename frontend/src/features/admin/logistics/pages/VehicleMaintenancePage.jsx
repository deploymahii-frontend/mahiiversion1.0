import {
  FiTool,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiEye,
  FiCalendar,
  FiTruck,
  FiAlertTriangle,
} from "react-icons/fi";

export default function VehicleMaintenancePage({
  loading,
  workOrders = [],
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
      case "Scheduled":
        return "bg-blue-100 text-blue-700";
      case "In Progress":
        return "bg-yellow-100 text-yellow-700";
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Overdue":
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
            <FiTool />
            Vehicle Maintenance
          </h2>

          <p className="text-gray-500">
            Manage preventive maintenance, repairs and vehicle health.
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
            New Work Order
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
              placeholder="Search maintenance..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>

        </div>

      </div>

      {/* Maintenance Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Work Order</th>
              <th className="p-4 text-left">Vehicle</th>
              <th className="p-4 text-left">Maintenance Type</th>
              <th className="p-4 text-center">Scheduled Date</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

            {workOrders.map((order) => (

              <tr
                key={order.id}
                className="border-t"
              >

                <td className="p-4 font-mono">
                  {order.number}
                </td>

                <td className="p-4">
                  <FiTruck className="inline mr-2" />
                  {order.vehicle}
                </td>

                <td className="p-4">
                  {order.type}
                </td>

                <td className="p-4 text-center">
                  <FiCalendar className="inline mr-2" />
                  {order.date}
                </td>

                <td className="p-4 text-center">

                  <span className={`rounded-full px-3 py-1 text-sm ${badge(order.status)}`}>
                    {order.status}
                  </span>

                </td>

                <td className="p-4">

                  <button
                    onClick={() => onView?.(order)}
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

      {/* Widgets */}

      <div className="grid gap-6 xl:grid-cols-3">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiCalendar className="mb-3 text-blue-600" size={24} />
          <h3 className="font-semibold">Maintenance Calendar</h3>
          <p className="mt-2 text-gray-500">
            Upcoming service schedules and reminders.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiTool className="mb-3 text-green-600" size={24} />
          <h3 className="font-semibold">Repair History</h3>
          <p className="mt-2 text-gray-500">
            Complete maintenance and repair records.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiAlertTriangle className="mb-3 text-red-600" size={24} />
          <h3 className="font-semibold">Overdue Maintenance</h3>
          <p className="mt-2 text-gray-500">
            Vehicles requiring immediate attention.
          </p>
        </div>

      </div>

    </div>
  );
}
