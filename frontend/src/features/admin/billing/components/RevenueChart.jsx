import {
  FiTrendingUp,
  FiCalendar,
  FiRefreshCw,
} from "react-icons/fi";

export default function RevenueChart({
  loading,
  data = [],
  period = "Monthly",
  onPeriodChange,
}) {
  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm">
        <div className="h-96 animate-pulse rounded-xl bg-gray-100" />
      </div>
    );
  }

  const maxRevenue = Math.max(
    ...data.map((item) => item.revenue),
    1
  );

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

        <div className="flex items-center gap-3">

          <FiTrendingUp size={24} />

          <div>

            <h2 className="text-2xl font-bold">
              Revenue Analytics
            </h2>

            <p className="text-gray-500">
              Revenue performance over time
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <FiCalendar />

          <select
            value={period}
            onChange={(e) =>
              onPeriodChange?.(e.target.value)
            }
            className="rounded-lg border px-4 py-2"
          >
            <option>Daily</option>
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Quarterly</option>
            <option>Yearly</option>
          </select>

          <button className="rounded-lg border p-2 hover:bg-gray-100">
            <FiRefreshCw />
          </button>

        </div>

      </div>

      <div className="flex h-96 items-end gap-3 overflow-x-auto">

        {data.map((item) => {
          const height =
            (item.revenue / maxRevenue) * 300;

          return (
            <div
              key={item.label}
              className="flex min-w-[60px] flex-col items-center"
            >

              <div
                className="w-full rounded-t-lg bg-blue-600 transition-all hover:bg-blue-700"
                style={{
                  height: `${height}px`,
                }}
                title={`₹${item.revenue.toLocaleString()}`}
              />

              <div className="mt-3 text-sm font-medium">
                {item.label}
              </div>

              <div className="text-xs text-gray-500">
                ₹{(item.revenue / 1000).toFixed(0)}K
              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}
