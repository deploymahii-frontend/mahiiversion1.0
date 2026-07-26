import { useState } from "react";

const PERIODS = [
  "Daily",
  "Weekly",
  "Monthly",
];

function StatCard({
  title,
  value,
  icon,
}) {
  return (
    <div className="rounded-xl border border-gray-200 p-4">

      <div className="flex items-center justify-between">

        <span className="text-3xl">
          {icon}
        </span>

        <span className="text-2xl font-bold">
          {value ?? "--"}
        </span>

      </div>

      <p className="mt-4 text-sm text-gray-500">
        {title}
      </p>

    </div>
  );
}

export default function OrdersChart({
  loading,
  data = {},
}) {
  const [period, setPeriod] =
    useState("Daily");

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        Loading order analytics...
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

        <div>

          <h2 className="text-2xl font-bold">
            Orders Analytics
          </h2>

          <p className="text-gray-500">
            Order trends and fulfillment insights.
          </p>

        </div>

        <select
          value={period}
          onChange={(e) =>
            setPeriod(e.target.value)
          }
          className="rounded-lg border px-4 py-2"
        >
          {PERIODS.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

      </div>

      <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">

        <StatCard
          title="Total Orders"
          icon="🛒"
          value={data.orders?.total}
        />

        <StatCard
          title="Completed"
          icon="✅"
          value={data.orders?.completed}
        />

        <StatCard
          title="Cancelled"
          icon="❌"
          value={data.orders?.cancelled}
        />

        <StatCard
          title="Pending"
          icon="📦"
          value={data.orders?.pending}
        />

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        <div className="rounded-xl border border-gray-200 p-5">

          <h3 className="mb-4 font-semibold">
            Orders Trend
          </h3>

          <div className="flex h-[280px] items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50">

            <div className="text-center">

              <div className="text-5xl">
                📈
              </div>

              <p className="mt-3">
                Orders Trend Chart
              </p>

            </div>

          </div>

        </div>

        <div className="rounded-xl border border-gray-200 p-5">

          <h3 className="mb-4 font-semibold">
            Order Status Distribution
          </h3>

          <div className="flex h-[280px] items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50">

            <div className="text-center">

              <div className="text-5xl">
                🥧
              </div>

              <p className="mt-3">
                Pie / Donut Chart
              </p>

            </div>

          </div>

        </div>

      </div>

      <div className="mt-6 rounded-xl border border-gray-200 p-5">

        <h3 className="mb-4 font-semibold">
          Peak Ordering Hours
        </h3>

        <div className="flex h-[220px] items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50">

          <div className="text-center">

            <div className="text-5xl">
              ⏰
            </div>

            <p className="mt-3">
              Hourly Orders Chart
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}
