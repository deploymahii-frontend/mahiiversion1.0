import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import AnalyticsChart from "./AnalyticsChart";

export default function RevenueChart({
  data = [],
}) {
  return (
    <AnalyticsChart
      title="Revenue"
      subtitle="Monthly revenue trend"
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            dataKey="revenue"
            stroke="#f97316"
            strokeWidth={3}
          />

        </LineChart>
      </ResponsiveContainer>
    </AnalyticsChart>
  );
}
