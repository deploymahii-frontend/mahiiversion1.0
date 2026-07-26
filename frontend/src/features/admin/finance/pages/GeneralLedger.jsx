import {
  FiBookOpen,
  FiSearch,
  FiFilter,
  FiRefreshCw,
  FiDownload,
  FiCalendar,
  FiEye,
  FiLock,
} from "react-icons/fi";

export default function GeneralLedger({
  loading,
  entries = [],
  search = "",
  onSearch,
  onRefresh,
  onExport,
  onView,
  onPeriodFilter,
  onLockPeriod,
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
            <FiBookOpen />
            General Ledger
          </h2>

          <p className="text-gray-500">
            Complete record of all posted accounting transactions.
          </p>
        </div>

        <div className="flex gap-3">
          <button onClick={onRefresh} className="rounded-lg border p-3">
            <FiRefreshCw />
          </button>

          <button onClick={onPeriodFilter} className="rounded-lg border px-5">
            <FiCalendar className="mr-2 inline" />
            Period
          </button>

          <button onClick={onLockPeriod} className="rounded-lg border px-5">
            <FiLock className="mr-2 inline" />
            Lock Period
          </button>

          <button onClick={onExport} className="rounded-lg bg-green-600 px-5 text-white">
            <FiDownload className="mr-2 inline" />
            Export
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
              placeholder="Search ledger..."
              className="w-full rounded-lg border py-2 pl-10 pr-4"
            />
          </div>

          <button className="rounded-lg border px-5">
            <FiFilter className="mr-2 inline" />
            Filter
          </button>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Journal</th>
              <th className="p-4 text-left">Account</th>
              <th className="p-4 text-right">Debit</th>
              <th className="p-4 text-right">Credit</th>
              <th className="p-4 text-right">Balance</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id} className="border-t">
                <td className="p-4">{entry.date}</td>
                <td className="p-4">{entry.journalNumber}</td>
                <td className="p-4">{entry.account}</td>

                <td className="p-4 text-right">{entry.debit}</td>

                <td className="p-4 text-right">{entry.credit}</td>

                <td className="p-4 text-right font-semibold">{entry.balance}</td>

                <td className="p-4">
                  <button onClick={() => onView?.(entry)} className="rounded border p-2">
                    <FiEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="rounded-2xl border border-dashed p-8 text-center text-gray-500">
        Journal Entries → General Ledger → Trial Balance → Financial Statements
      </div>
    </div>
  );
}
