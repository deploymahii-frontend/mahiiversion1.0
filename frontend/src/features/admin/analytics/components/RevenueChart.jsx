import { useState } from "react";

const PERIODS = [
  "Daily",
  "Weekly",
  "Monthly",
  "Yearly",
];

function SummaryCard({
  title,
  value,
  prefix = "",
  suffix = "",
}) {
  return (
    <div className="rounded-xl border border-gray-200 p-4">

      <p className="text-sm text-gray-500">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold">
        {prefix}
        {value ?? "--"}
        {suffix}
      </p>

    </div>
  );
}

export default function RevenueChart({
  loading,
  data = {},
}) {
  const [period, setPeriod] =
    useState("Daily");

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-8 text-center shadow-sm">
        Loading revenue analytics...
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">

        <div>

          <h2 className="text-2xl font-bold">
            Revenue Analytics
          </h2>

          <p className="text-gray-500">
            Revenue trends and financial performance.
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

      <div className="mb-6 grid gap-4 md:grid-cols-3">

        <SummaryCard
          title="Total Revenue"
          prefix="₹"
          value={data.revenue?.total}
        />

        <SummaryCard
          title="Average Revenue"
          prefix="₹"
          value={data.revenue?.average}
        />

        <SummaryCard
          title="Growth"
          value={data.revenue?.growth}
          suffix="%"
        />

      </div>

      <div className="flex h-[360px] items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50">

        <div className="text-center">

          <div className="text-5xl">
            📈
          </div>

          <h3 className="mt-4 text-xl font-semibold">
            Revenue Chart
          </h3>

          <p className="mt-2 text-gray-500">
            Integrate Recharts, ECharts,
            ApexCharts, or Chart.js here.
          </p>

        </div>

      </div>

    </div>
  );
}
