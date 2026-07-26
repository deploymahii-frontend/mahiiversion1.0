import {
  FiTruck,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiEye,
  FiCheckCircle,
  FiMapPin,
  FiPackage,
} from "react-icons/fi";

export default function DispatchManagementPage({
  loading,
  shipments = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreate,
  onView,
  onDispatch,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[760px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  const statusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "In Transit":
        return "bg-blue-100 text-blue-700";
      case "Ready":
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

      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">

        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiTruck />
            Dispatch Management
          </h2>

          <p className="text-gray-500">
            Manage shipments, carriers, delivery tracking and proof of delivery.
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
            Create Shipment
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
              placeholder="Search shipment..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>

        </div>

      </div>

      {/* Shipment Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Shipment No.</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Carrier</th>
              <th className="p-4 text-center">Packages</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

            {shipments.map((shipment) => (

              <tr
                key={shipment.id}
                className="border-t"
              >

                <td className="p-4 font-mono">
                  {shipment.number}
                </td>

                <td className="p-4">
                  {shipment.customer}
                </td>

                <td className="p-4">
                  {shipment.carrier}
                </td>

                <td className="p-4 text-center">
                  {shipment.packages}
                </td>

                <td className="p-4 text-center">

                  <span className={`rounded-full px-3 py-1 text-sm ${statusColor(shipment.status)}`}>
                    {shipment.status}
                  </span>

                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button
                      onClick={() => onView?.(shipment)}
                      className="rounded border p-2"
                    >
                      <FiEye />
                    </button>

                    {shipment.status === "Ready" && (
                      <button
                        onClick={() => onDispatch?.(shipment)}
                        className="rounded border p-2"
                      >
                        <FiCheckCircle />
                      </button>
                    )}

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Bottom Widgets */}

      <div className="grid gap-6 md:grid-cols-2">

        <div className="rounded-2xl bg-white shadow-sm p-6">

          <FiMapPin className="mb-3 text-indigo-600" size={22} />

          <h3 className="font-semibold">
            Live Shipment Tracking
          </h3>

          <p className="mt-2 text-gray-500">
            Monitor shipment location and delivery progress in real time.
          </p>

        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">

          <FiPackage className="mb-3 text-green-600" size={22} />

          <h3 className="font-semibold">
            Proof of Delivery
          </h3>

          <p className="mt-2 text-gray-500">
            Store customer signatures, delivery photos and delivery confirmation.
          </p>

        </div>

      </div>

    </div>
  );
}
