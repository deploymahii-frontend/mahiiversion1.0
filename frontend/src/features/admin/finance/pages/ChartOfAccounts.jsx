import {
  FiBook,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiPlus,
  FiEdit,
  FiEye,
} from "react-icons/fi";

export default function ChartOfAccounts({
  loading,
  accounts = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onCreate,
  onView,
  onEdit,
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
            <FiBook />
            Chart of Accounts
          </h2>

          <p className="text-gray-500">
            Manage the financial account structure for the organization.
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
            New Account
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
              placeholder="Search account..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />
          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>
        </div>
      </div>

      {/* Accounts */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Code</th>
              <th className="p-4 text-left">Account Name</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Parent</th>
              <th className="p-4 text-left">Posting</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {accounts.map((account) => (
              <tr key={account.id} className="border-t">
                <td className="p-4 font-mono">{account.code}</td>
                <td className="p-4">{account.name}</td>
                <td className="p-4">{account.category}</td>
                <td className="p-4">{account.parent || "-"}</td>

                <td className="p-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm ${
                      account.posting ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {account.posting ? "Posting" : "Group"}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <button onClick={() => onView?.(account)} className="rounded border p-2">
                      <FiEye />
                    </button>

                    <button onClick={() => onEdit?.(account)} className="rounded border p-2">
                      <FiEdit />
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
        Assets • Liabilities • Equity • Revenue • Expenses
      </div>
    </div>
  );
}
