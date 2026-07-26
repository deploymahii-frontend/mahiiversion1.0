import {
  FiFileText,
  FiRefreshCw,
  FiDownload,
  FiCalendar,
  FiBarChart2,
  FiEye,
} from "react-icons/fi";

export default function FinancialStatements({
  loading,
  statements = [],
  onRefresh,
  onExport,
  onView,
  onDateRange,
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
            Financial Statements
          </h2>

          <p className="text-gray-500">
            Generate statutory and management financial reports.
          </p>
        </div>

        <div className="flex gap-3">
          <button onClick={onRefresh} className="rounded-lg border p-3">
            <FiRefreshCw />
          </button>

          <button onClick={onDateRange} className="rounded-lg border px-5">
            <FiCalendar className="mr-2 inline" />
            Reporting Period
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

      {/* Statements */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
        {statements.map((statement) => (
          <div key={statement.id} className="rounded-2xl bg-white shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold">{statement.name}</h3>

                <p className="mt-2 text-gray-500">{statement.description}</p>
              </div>

              <FiBarChart2 className="text-4xl text-indigo-600" />
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => onView?.(statement)}
                className="rounded-lg border px-4 py-2"
              >
                <FiEye className="mr-2 inline" />
                View
              </button>

              <button
                onClick={() => onExport?.(statement)}
                className="rounded-lg bg-indigo-600 px-4 py-2 text-white"
              >
                <FiDownload className="mr-2 inline" />
                Export
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Workflow */}
      <div className="rounded-2xl border border-dashed p-8 text-center text-gray-500">
        General Ledger → Trial Balance → Financial Statements → Management Reports
      </div>
    </div>
  );
}
