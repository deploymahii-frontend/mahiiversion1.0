import {
  FiClipboard,
  FiPlus,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiEye,
  FiCheckCircle,
  FiUsers,
} from "react-icons/fi";

export default function StockAudit({
  loading,
  overview = {},
  audits = [],
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
      title: "Audits Completed",
      value: overview.completed ?? 0,
    },
    {
      title: "Scheduled",
      value: overview.scheduled ?? 0,
    },
    {
      title: "Pending Approval",
      value: overview.pendingApproval ?? 0,
    },
    {
      title: "Variance %",
      value: overview.variance ?? "0%",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">

        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiClipboard />
            Stock Audit
          </h2>

          <p className="text-gray-500">
            Conduct physical stock verification and reconcile inventory.
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
            Audit
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
              placeholder="Search audit..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />

          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>

        </div>

      </div>

      {/* Audit Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-4 text-left">Audit No.</th>
              <th className="p-4 text-left">Warehouse</th>
              <th className="p-4 text-left">Auditor</th>
              <th className="p-4 text-left">Audit Date</th>
              <th className="p-4 text-left">Variance</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>

            </tr>

          </thead>

          <tbody>

            {audits.map((audit) => (

              <tr
                key={audit.id}
                className="border-t"
              >

                <td className="p-4">{audit.number}</td>
                <td className="p-4">{audit.warehouse}</td>

                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <FiUsers />
                    {audit.auditor}
                  </div>
                </td>

                <td className="p-4">{audit.date}</td>
                <td className="p-4">{audit.variance}</td>

                <td className="p-4">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                    {audit.status}
                  </span>
                </td>

                <td className="p-4">

                  <div className="flex gap-2">

                    <button
                      onClick={() => onView?.(audit)}
                      className="rounded border p-2"
                    >
                      <FiEye />
                    </button>

                    <button
                      onClick={() => onApprove?.(audit)}
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

      {/* Footer */}
      <div className="rounded-2xl border border-dashed p-8 text-center text-gray-500">
        Physical Count → Variance Detection → Approval → Inventory Adjustment → Audit Archive
      </div>

    </div>
  );
}
