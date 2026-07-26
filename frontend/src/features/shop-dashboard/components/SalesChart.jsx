export default function SalesChart({ period = "Last 7 Days" }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Sales Overview</h2>
          <p className="text-sm text-gray-500">{period}</p>
        </div>

        <select className="rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-orange-500">
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="flex h-80 items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-700">Sales Chart</h3>
          <p className="mt-2 text-sm text-gray-500">Analytics chart will appear here.</p>
        </div>
      </div>
    </div>
  );
}
