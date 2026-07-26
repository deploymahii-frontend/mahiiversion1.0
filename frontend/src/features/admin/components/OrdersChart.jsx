import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import AnalyticsChart from "./AnalyticsChart";

export default function OrdersChart({
  data = [],
}) {
  return (
    <AnalyticsChart
      title="Orders"
      subtitle="Monthly order volume"
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="orders"
            fill="#3b82f6"
            radius={[6, 6, 0, 0]}
          />

        </BarChart>
      </ResponsiveContainer>
    </AnalyticsChart>
  );
}
