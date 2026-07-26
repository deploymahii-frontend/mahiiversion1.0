import {
  FiMapPin,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiEye,
  FiNavigation,
  FiClock,
  FiTruck,
  FiCheckCircle,
} from "react-icons/fi";

export default function DeliveryTrackingPage({
  loading,
  deliveries = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
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
      case "In Transit":
        return "bg-blue-100 text-blue-700";
      case "Out for Delivery":
        return "bg-yellow-100 text-yellow-700";
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Delayed":
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
            <FiMapPin />
            Delivery Tracking
          </h2>

          <p className="text-gray-500">
            Monitor live delivery progress, ETA and shipment status.
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

      {/* Delivery Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Shipment</th>
              <th className="p-4 text-left">Driver</th>
              <th className="p-4 text-left">Vehicle</th>
              <th className="p-4 text-center">Current Location</th>
              <th className="p-4 text-center">ETA</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

            {deliveries.map((delivery) => (

              <tr
                key={delivery.id}
                className="border-t"
              >

                <td className="p-4 font-mono">
                  {delivery.shipment}
                </td>

                <td className="p-4">
                  {delivery.driver}
                </td>

                <td className="p-4">
                  <FiTruck className="inline mr-2" />
                  {delivery.vehicle}
                </td>

                <td className="p-4 text-center">
                  <FiNavigation className="inline mr-2" />
                  {delivery.location}
                </td>

                <td className="p-4 text-center">
                  <FiClock className="inline mr-2" />
                  {delivery.eta}
                </td>

                <td className="p-4 text-center">

                  <span className={`rounded-full px-3 py-1 text-sm ${badge(delivery.status)}`}>
                    {delivery.status}
                  </span>

                </td>

                <td className="p-4">

                  <button
                    onClick={() => onView?.(delivery)}
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

      {/* Dashboard */}

      <div className="grid gap-6 xl:grid-cols-2">

        <div className="rounded-2xl bg-white shadow-sm h-[320px] flex items-center justify-center text-gray-400">
          Live GPS Map
        </div>

        <div className="rounded-2xl bg-white shadow-sm h-[320px] flex items-center justify-center text-gray-400">
          Delivery Timeline & ETA Dashboard
        </div>

      </div>

      {/* Summary */}

      <div className="rounded-2xl bg-white shadow-sm p-6">

        <h3 className="flex items-center gap-2 text-lg font-bold">
          <FiCheckCircle />
          Delivery Performance Summary
        </h3>

        <p className="mt-3 text-gray-500">
          On-time deliveries, delayed shipments, average delivery duration,
          successful delivery rate, and customer notification history.
        </p>

      </div>

    </div>
  );
}