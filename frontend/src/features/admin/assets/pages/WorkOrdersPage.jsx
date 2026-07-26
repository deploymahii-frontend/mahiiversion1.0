import {
  FiClipboard,
  FiPlus,
  FiRefreshCw,
  FiDownload,
  FiSearch,
  FiEye,
  FiUser,
  FiCalendar,
  FiCheckSquare,
} from "react-icons/fi";

export default function WorkOrdersPage({
  loading,
  workOrders = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreateWorkOrder,
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
      case "In Progress":
        return "bg-blue-100 text-blue-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Cancelled":
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
            <FiClipboard />
            Work Orders
          </h2>

          <p className="text-gray-500">
            Plan, assign, execute, and monitor maintenance work orders.
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
            onClick={onCreateWorkOrder}
            className="bg-indigo-600 text-white px-5 rounded-lg"
          >
            <FiPlus className="inline mr-2"/>
            New Work Order
          </button>

        </div>

      </div>

      {/* Search */}

      <div className="rounded-2xl bg-white shadow-sm p-4">

        <div className="relative">

          <FiSearch className="absolute left-3 top-3 text-gray-400"/>

          <input
            className="w-full rounded-lg border py-2 pl-10"
            placeholder="Search work orders..."
            value={search}
            onChange={(e)=>onSearch?.(e.target.value)}
          />

        </div>

      </div>

      {/* Work Order Table */}

      <div className="rounded-2xl bg-white shadow-sm overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Work Order</th>
              <th className="text-center">Technician</th>
              <th className="text-center">Scheduled Date</th>
              <th className="text-center">Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>

            {workOrders.map(order => (

              <tr key={order.id} className="border-t">

                <td className="p-4 font-medium">
                  {order.number}
                </td>

                <td className="text-center">
                  <FiUser className="inline mr-1"/>
                  {order.technician}
                </td>

                <td className="text-center">
                  <FiCalendar className="inline mr-1"/>
                  {order.date}
                </td>

                <td className="text-center">
                  <span className={`rounded-full px-3 py-1 ${badge(order.status)}`}>
                    {order.status}
                  </span>
                </td>

                <td className="text-center">
                  <button
                    onClick={() => onView?.(order)}
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

      {/* Dashboard Cards */}

      <div className="grid gap-6 xl:grid-cols-4">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiClipboard size={24}/>
          <h3 className="mt-4 font-semibold">Open Orders</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiUser size={24}/>
          <h3 className="mt-4 font-semibold">Assigned Technicians</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiCalendar size={24}/>
          <h3 className="mt-4 font-semibold">Scheduled Today</h3>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiCheckSquare size={24}/>
          <h3 className="mt-4 font-semibold">Completed Orders</h3>
        </div>

      </div>

    </div>
  );
}
