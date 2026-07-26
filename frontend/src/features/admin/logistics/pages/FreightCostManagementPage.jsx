import {
  FiDollarSign,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiEye,
  FiTruck,
  FiFileText,
  FiPercent,
} from "react-icons/fi";

export default function FreightCostManagementPage({
  loading,
  freightCosts = [],
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
      case "Approved":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Rejected":
        return "bg-red-100 text-red-700";
      case "Paid":
        return "bg-indigo-100 text-indigo-700";
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
            <FiDollarSign />
            Freight Cost Management
          </h2>

          <p className="text-gray-500">
            Manage freight rates, carrier costs, invoices and transportation expenses.
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
            New Freight Cost
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
              placeholder="Search shipment or carrier..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>

        </div>

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="p-4 text-left">Shipment</th>
              <th className="p-4 text-left">Carrier</th>
              <th className="p-4 text-center">Freight Cost</th>
              <th className="p-4 text-center">Fuel Surcharge</th>
              <th className="p-4 text-center">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

            {freightCosts.map((item) => (

              <tr key={item.id} className="border-t">

                <td className="p-4 font-mono">
                  {item.shipment}
                </td>

                <td className="p-4">
                  <FiTruck className="inline mr-2" />
                  {item.carrier}
                </td>

                <td className="p-4 text-center">
                  {item.freightCost}
                </td>

                <td className="p-4 text-center">
                  <FiPercent className="inline mr-2" />
                  {item.fuelSurcharge}
                </td>

                <td className="p-4 text-center">

                  <span className={`rounded-full px-3 py-1 text-sm ${badge(item.status)}`}>
                    {item.status}
                  </span>

                </td>

                <td className="p-4">

                  <button
                    onClick={() => onView?.(item)}
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
          <FiDollarSign className="mb-3 text-green-600" size={24} />
          <h3 className="font-semibold">Transportation Cost</h3>
          <p className="mt-2 text-gray-500">
            Freight spending by shipment and route.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiTruck className="mb-3 text-blue-600" size={24} />
          <h3 className="font-semibold">Carrier Performance</h3>
          <p className="mt-2 text-gray-500">
            Compare cost, delivery time and service quality.
          </p>
        </div>

        <div className="rounded-2xl bg-white shadow-sm p-6">
          <FiFileText className="mb-3 text-indigo-600" size={24} />
          <h3 className="font-semibold">Invoice Verification</h3>
          <p className="mt-2 text-gray-500">
            Validate freight invoices before payment.
          </p>
        </div>

      </div>

    </div>
  );
}