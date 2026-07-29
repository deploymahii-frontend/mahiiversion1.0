import {
  FiPercent,
  FiFileText,
  FiCalendar,
  FiDownload,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiBarChart2,
} from "react-icons/fi";

export default function GSTCenter({
  loading,
  overview = {},
  gstRecords = [],
  search = "",
  onSearch,
  onRefresh,
  onExportPDF,
  onExportExcel,
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
      title: "GST Collected",
      value: overview.collected ?? "₹0",
      icon: FiPercent,
      color: "bg-green-500",
    },
    {
      title: "GST Paid",
      value: overview.paid ?? "₹0",
      icon: FiFileText,
      color: "bg-blue-500",
    },
    {
      title: "Returns Filed",
      value: overview.filedReturns ?? 0,
      icon: FiCalendar,
      color: "bg-purple-500",
    },
    {
      title: "Outstanding",
      value: overview.outstanding ?? "₹0",
      icon: FiPercent,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              GST Center
            </h2>

            <p className="text-gray-500">
              GST collection, reconciliation and tax reporting.
            </p>
          </div>

          <button
            onClick={onRefresh}
            className="rounded-lg border p-3 hover:bg-gray-100"
          >
            <FiRefreshCw />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">{card.title}</p>
                  <h3 className="mt-3 text-3xl font-bold">
                    {card.value}
                  </h3>
                </div>

                <div className={`${card.color} rounded-xl p-3 text-white`}>
                  <Icon size={22} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Search & Filters */}
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row">

          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />

            <input
              value={search}
              onChange={(e) => onSearch?.(e.target.value)}
              placeholder="Search merchant, invoice or GST number..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />
          </div>

          <button className="rounded-lg border px-5 py-2 hover:bg-gray-100">
            <FiFilter className="mr-2 inline" />
            Filters
          </button>

        </div>
      </div>

      {/* GST Records */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full">

          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Invoice</th>
              <th className="p-4 text-left">Merchant</th>
              <th className="p-4 text-left">GST %</th>
              <th className="p-4 text-left">Tax Amount</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {gstRecords.map((record) => (
              <tr
                key={record.id}
                className="border-t"
              >
                <td className="p-4">{record.invoice}</td>
                <td className="p-4">{record.merchant}</td>
                <td className="p-4">{record.rate}</td>
                <td className="p-4">{record.taxAmount}</td>

                <td className="p-4">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* Export */}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={onExportPDF}
          className="rounded-lg bg-red-600 px-5 py-3 text-white"
        >
          <FiDownload className="mr-2 inline" />
          Export PDF
        </button>

        <button
          onClick={onExportExcel}
          className="rounded-lg bg-green-600 px-5 py-3 text-white"
        >
          <FiDownload className="mr-2 inline" />
          Export Excel
        </button>
      </div>

      {/* Analytics */}
      <div className="rounded-2xl border border-dashed p-10 text-center text-gray-500">
        <FiBarChart2
          size={30}
          className="mx-auto mb-3"
        />
        GST Collection • Tax Liability • Filing Timeline • Reconciliation
      </div>

    </div>
  );
}
