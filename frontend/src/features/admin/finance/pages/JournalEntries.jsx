import {
  FiFileText,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiEye,
  FiEdit,
  FiCheckCircle,
} from "react-icons/fi";

export default function JournalEntries({
  loading,
  journals = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreate,
  onView,
  onEdit,
  onApprove,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-[720px] animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-2xl bg-white shadow-sm p-6 flex justify-between items-center">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiFileText />
            Journal Entries
          </h2>

          <p className="text-gray-500">
            Create, review, approve, and post accounting journals.
          </p>
        </div>

        <div className="flex gap-3">
          <button onClick={onRefresh} className="rounded-lg border p-3">
            <FiRefreshCw />
          </button>

          <button onClick={onExport} className="rounded-lg bg-green-600 px-5 text-white">
            <FiDownload className="mr-2 inline" />
            Export
          </button>

          <button onClick={onCreate} className="rounded-lg bg-indigo-600 px-5 text-white">
            <FiPlus className="mr-2 inline" />
            New Journal
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
              placeholder="Search journal..."
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
              <th className="p-4 text-left">Journal No.</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Description</th>
              <th className="p-4 text-right">Debit</th>
              <th className="p-4 text-right">Credit</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {journals.map((journal) => (
              <tr key={journal.id} className="border-t">
                <td className="p-4 font-mono">{journal.number}</td>

                <td className="p-4">{journal.date}</td>

                <td className="p-4">{journal.description}</td>

                <td className="p-4 text-right">{journal.debit}</td>

                <td className="p-4 text-right">{journal.credit}</td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      journal.status === "Posted"
                        ? "bg-green-100 text-green-700"
                        : journal.status === "Approved"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {journal.status}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <button onClick={() => onView?.(journal)} className="rounded border p-2">
                      <FiEye />
                    </button>

                    <button onClick={() => onEdit?.(journal)} className="rounded border p-2">
                      <FiEdit />
                    </button>

                    {journal.status !== "Posted" && (
                      <button onClick={() => onApprove?.(journal)} className="rounded border p-2">
                        <FiCheckCircle />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="rounded-2xl border border-dashed p-8 text-center text-gray-500">
        Draft → Approval → Posting → General Ledger
      </div>
    </div>
  );
}
