import {
  FiPackage,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiEye,
  FiCheckCircle,
} from "react-icons/fi";

export default function GoodsReceived({
  loading,
  overview = {},
  receipts = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onView,
  onComplete,
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
      title: "GRNs Created",
      value: overview.totalGRNs ?? 0,
    },
    {
      title: "Pending Inspection",
      value: overview.pendingInspection ?? 0,
    },
    {
      title: "Completed",
      value: overview.completed ?? 0,
    },
    {
      title: "Rejected Items",
      value: overview.rejectedItems ?? 0,
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiPackage />
            Goods Received (GRN)
          </h2>

          <p className="text-gray-500">
            Verify supplier deliveries and receive inventory into stock.
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
              placeholder="Search GRN..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />
          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>
        </div>
      </div>

      {/* GRN Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">GRN No.</th>
              <th className="p-4 text-left">PO Number</th>
              <th className="p-4 text-left">Supplier</th>
              <th className="p-4 text-left">Received Date</th>
              <th className="p-4 text-left">Items</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {receipts.map((grn) => (
              <tr
                key={grn.id}
                className="border-t"
              >
                <td className="p-4">{grn.number}</td>
                <td className="p-4">{grn.poNumber}</td>
                <td className="p-4">{grn.supplier}</td>
                <td className="p-4">{grn.receivedDate}</td>
                <td className="p-4">{grn.items}</td>

                <td className="p-4">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                    {grn.status}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex gap-2">

                    <button
                      onClick={() => onView?.(grn)}
                      className="rounded border p-2"
                    >
                      <FiEye />
                    </button>

                    <button
                      onClick={() => onComplete?.(grn)}
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

      {/* Workflow Summary */}
      <div className="rounded-2xl border border-dashed p-8 text-center text-gray-500">
        Quantity Verification • Quality Inspection • Batch & Expiry • Barcode Assignment • Inventory Ledger Update
      </div>

    </div>
  );
}
