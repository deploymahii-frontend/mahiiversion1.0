export default function OrdersChart({
  data = [],
  period = "Last 30 Days",
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-xl font-semibold">
            Orders Overview
          </h2>

          <p className="text-sm text-gray-500">
            {period}
          </p>
        </div>

        <button className="rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50">
          Export
        </button>

      </div>

      <div className="flex h-80 items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50">

        <div className="text-center">

          <h3 className="text-lg font-medium text-gray-700">
            Orders Chart
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Order trend analytics will appear here.
          </p>

        </div>

      </div>

    </div>
  );
}
