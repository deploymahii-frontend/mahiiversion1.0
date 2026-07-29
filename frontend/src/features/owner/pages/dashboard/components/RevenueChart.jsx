import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function RevenueChart({
  data = [],
  loading = false,
}) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-[360px] animate-pulse">
        <div className="h-6 w-48 bg-gray-200 rounded mb-6" />
        <div className="h-full bg-gray-100 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 h-[360px]">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Revenue Overview
        </h2>

        <p className="text-gray-500 mt-1">
          Last 7 days revenue
        </p>
      </div>

      <ResponsiveContainer
        width="100%"
        height="85%"
      >
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#7c3aed"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
