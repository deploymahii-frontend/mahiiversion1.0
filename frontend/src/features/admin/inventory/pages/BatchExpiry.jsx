import {
  FiCalendar,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiEye,
  FiClock,
} from "react-icons/fi";

export default function BatchExpiry({
  loading,
  overview = {},
  batches = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onView,
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
      title: "Active Batches",
      value: overview.activeBatches ?? 0,
    },
    {
      title: "Near Expiry",
      value: overview.nearExpiry ?? 0,
    },
    {
      title: "Expired",
      value: overview.expired ?? 0,
    },
    {
      title: "Products Tracked",
      value: overview.productsTracked ?? 0,
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">

        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiCalendar />
            Batch & Expiry
          </h2>

          <p className="text-gray-500">
            Track batches, expiry dates, and product traceability.
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

            <h3 className="mt-3 text-3xl font-bold">
              {card.value}
            </h3>
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
              placeholder="Search batch..."
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
              <th className="p-4 text-left">Batch</th>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Warehouse</th>
              <th className="p-4 text-left">Quantity</th>
              <th className="p-4 text-left">Expiry Date</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>

          </thead>

          <tbody>

            {batches.map((batch) => (

              <tr
                key={batch.id}
                className="border-t"
              >

                <td className="p-4">{batch.batchNumber}</td>
                <td className="p-4">{batch.product}</td>
                <td className="p-4">{batch.warehouse}</td>
                <td className="p-4">{batch.quantity}</td>
                <td className="p-4">{batch.expiryDate}</td>

                <td className="p-4">

                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-700">
                    {batch.status}
                  </span>

                </td>

                <td className="p-4">

                  <button
                    onClick={() => onView?.(batch)}
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

      {/* Workflow */}
      <div className="rounded-2xl border border-dashed p-8 text-center text-gray-500">

        <FiClock className="mx-auto mb-3 text-2xl" />

        Batch Creation → Receiving → Inventory → FEFO Allocation → Expiry Alert → Write-Off

      </div>

    </div>
  );
}
