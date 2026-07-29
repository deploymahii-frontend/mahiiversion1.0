import {
  FiPercent,
  FiRefreshCw,
  FiDownload,
  FiSearch,
  FiFilter,
  FiEye,
  FiSettings,
} from "react-icons/fi";

export default function TaxGSTManagement({
  loading,
  overview = {},
  returns = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onConfigure,
  onView,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[720px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  const cards = [
    { title: "Output GST", value: overview.outputGST ?? "₹0" },
    { title: "Input GST", value: overview.inputGST ?? "₹0" },
    { title: "Net Tax Payable", value: overview.netGST ?? "₹0" },
    { title: "Pending Returns", value: overview.pendingReturns ?? 0 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-white shadow-sm p-6 flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiPercent />
            Tax & GST Management
          </h2>

          <p className="text-gray-500">
            Configure taxes, manage GST, and generate statutory returns.
          </p>
        </div>

        <div className="flex gap-3">
          <button onClick={onRefresh} className="rounded-lg border p-3">
            <FiRefreshCw />
          </button>

          <button onClick={onConfigure} className="rounded-lg border px-5">
            <FiSettings className="mr-2 inline" />
            Configure
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
          <div key={card.title} className="rounded-2xl bg-white shadow-sm p-5">
            <p className="text-sm text-gray-500">{card.title}</p>
            <h3 className="mt-3 text-3xl font-bold">{card.value}</h3>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="rounded-2xl bg-white shadow-sm p-4">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />

            <input
              value={search}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Search GST return..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />
          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>
        </div>
      </div>

      {/* Returns */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Return</th>
              <th className="p-4 text-left">Period</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-right">Tax Amount</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {returns.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-4 font-semibold">{item.returnName}</td>
                <td className="p-4">{item.period}</td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      item.status === "Filed"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="p-4 text-right">{item.taxAmount}</td>

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

      {/* Workflow */}
      <div className="rounded-2xl border border-dashed p-8 text-center text-gray-500">
        Sales & Purchases → GST Calculation → Reconciliation → GST Return → Filing
      </div>
    </div>
  );
}
