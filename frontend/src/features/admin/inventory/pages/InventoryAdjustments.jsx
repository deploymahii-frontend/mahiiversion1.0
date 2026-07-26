import {
  FiSliders,
  FiPlus,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiEye,
  FiCheckCircle,
  FiAlertTriangle,
} from "react-icons/fi";

export default function InventoryAdjustments({
  loading,
  overview = {},
  adjustments = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreate,
  onView,
  onApprove,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[700px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  const cards = [
    {
      title: "Total Adjustments",
      value: overview.totalAdjustments ?? 0,
    },
    {
      title: "Pending Approval",
      value: overview.pendingApproval ?? 0,
    },
    {
      title: "Approved",
      value: overview.approved ?? 0,
    },
    {
      title: "Inventory Impact",
      value: overview.inventoryImpact ?? "₹0",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiSliders />
            Inventory Adjustments
          </h2>

          <p className="text-gray-500">
            Record stock corrections, damages, losses, and manual adjustments.
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
            className="rounded-lg bg-green-600 px-5 text-white"
          >
            <FiDownload className="mr-2 inline" />
            Export
          </button>

          <button
            onClick={onCreate}
            className="rounded-lg bg-indigo-600 px-5 text-white"
          >
            <FiPlus className="mr-2 inline" />
            Adjustment
          </button>
        </div>
      </div>

      {/* KPI */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className="rounded-2xl bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-gray-500">{card.title}</p>
            <h3 className="mt-3 text-3xl font-bold">{card.value}</h3>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex gap-4">

          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              value={search}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Search adjustment..."
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
              <th className="p-4 text-left">Adjustment No.</th>
              <th className="p-4 text-left">Warehouse</th>
              <th className="p-4 text-left">Reason</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Impact</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {adjustments.map((adjustment) => (
              <tr
                key={adjustment.id}
                className="border-t"
              >
                <td className="p-4">{adjustment.number}</td>
                <td className="p-4">{adjustment.warehouse}</td>
                <td className="p-4">{adjustment.reason}</td>
                <td className="p-4">{adjustment.date}</td>
                <td className="p-4">{adjustment.impact}</td>

                <td className="p-4">
                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                    {adjustment.status}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex gap-2">

                    <button
                      onClick={() => onView?.(adjustment)}
                      className="rounded border p-2"
                    >
                      <FiEye />
                    </button>

                    <button
                      onClick={() => onApprove?.(adjustment)}
                      className="rounded border p-2 text-green-600"
                    >
                      <FiCheckCircle />
                    </button>

                  </div>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Guidance */}
      <div className="rounded-2xl border border-dashed p-8 text-center text-gray-500">
        <FiAlertTriangle className="mx-auto mb-3 text-2xl" />
        Damage • Wastage • Theft • Expiry • Physical Count Difference • Administrative Correction
      </div>

    </div>
  );
}
