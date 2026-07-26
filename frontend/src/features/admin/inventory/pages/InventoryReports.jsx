import {
  FiBarChart2,
  FiDownload,
  FiCalendar,
  FiRefreshCw,
  FiSearch,
  FiFilter,
  FiFileText,
  FiEye,
} from "react-icons/fi";

export default function InventoryReports({
  loading,
  overview = {},
  reports = [],
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
      title: "Reports Generated",
      value: overview.generated ?? 0,
    },
    {
      title: "Inventory Value",
      value: overview.inventoryValue ?? "₹0",
    },
    {
      title: "Movement Records",
      value: overview.movements ?? 0,
    },
    {
      title: "Exports",
      value: overview.exports ?? 0,
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">

        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiBarChart2 />
            Inventory Reports
          </h2>

          <p className="text-gray-500">
            Generate operational and financial inventory reports.
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

      {/* Filters */}
      <div className="rounded-2xl bg-white p-4 shadow-sm">

        <div className="flex gap-4">

          <div className="relative flex-1">

            <FiSearch className="absolute left-3 top-3 text-gray-400" />

            <input
              value={search}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Search report..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

          <button className="rounded-lg border px-5">
            <FiCalendar className="mr-2 inline" />
            Date Range
          </button>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filters
          </button>

        </div>

      </div>

      {/* Reports */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">Report</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Generated</th>
              <th className="p-4 text-left">Format</th>
              <th className="p-4 text-left">Actions</th>

            </tr>

          </thead>

          <tbody>

            {reports.map((report) => (

              <tr
                key={report.id}
                className="border-t"
              >

                <td className="p-4">{report.name}</td>
                <td className="p-4">{report.category}</td>
                <td className="p-4">{report.generatedAt}</td>
                <td className="p-4">{report.format}</td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button
                      onClick={() => onView?.(report)}
                      className="rounded border p-2"
                    >
                      <FiEye />
                    </button>

                    <button
                      onClick={() => onExport?.(report)}
                      className="rounded border p-2"
                    >
                      <FiFileText />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Report Types */}
      <div className="rounded-2xl border border-dashed p-8 text-center text-gray-500">
        Stock Summary • Inventory Valuation • Movement History • Warehouse Report • Batch Report • Slow/Fast Moving • Expiry Report • Audit Report
      </div>

    </div>
  );
}
