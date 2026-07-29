import {
  FiCheckCircle,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiEye,
  FiCamera,
  FiMapPin,
  FiClock,
  FiFileText,
} from "react-icons/fi";

export default function ProofOfDeliveryPage({
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
      case "Verified":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Failed":
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
            <FiCheckCircle />
            Proof of Delivery
          </h2>

          <p className="text-gray-500">
            Manage delivery confirmations, signatures and compliance records.
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
              placeholder="Search POD..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>

        </div>

      </div>

      {/* POD Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Shipment</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-center">Photo</th>
              <th className="p-4 text-center">GPS</th>
              <th className="p-4 text-center">Delivered At</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

            {deliveries.map((pod) => (

              <tr
                key={pod.id}
                className="border-t"
              >

                <td className="p-4 font-mono">
                  {pod.shipment}
                </td>

                <td className="p-4">
                  {pod.customer}
                </td>

                <td className="p-4 text-center">
                  <FiCamera className="inline" />
                </td>

                <td className="p-4 text-center">
                  <FiMapPin className="inline" />
                </td>

                <td className="p-4 text-center">
                  <FiClock className="inline mr-2" />
                  {pod.time}
                </td>

                <td className="p-4 text-center">

                  <span className={`rounded-full px-3 py-1 text-sm ${badge(pod.status)}`}>
                    {pod.status}
                  </span>

                </td>

                <td className="p-4">

                  <button
                    onClick={() => onView?.(pod)}
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

      <div className="grid gap-6 xl:grid-cols-3">

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiCamera className="mb-3 text-indigo-600" size={24} />
          <h3 className="font-semibold">Delivery Photos</h3>
          <p className="mt-2 text-gray-500">
            Image evidence captured at delivery.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiFileText className="mb-3 text-green-600" size={24} />
          <h3 className="font-semibold">Digital Signatures</h3>
          <p className="mt-2 text-gray-500">
            Customer signature verification records.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiMapPin className="mb-3 text-red-600" size={24} />
          <h3 className="font-semibold">GPS Verification</h3>
          <p className="mt-2 text-gray-500">
            Geo-location confirmation for deliveries.
          </p>
        </div>

      </div>

    </div>
  );
}
