import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import AnalyticsChart from "./AnalyticsChart";

export default function UsersChart({
  data = [],
}) {
  return (
    <AnalyticsChart
      title="Users"
      subtitle="Monthly user registrations"
    >
      <ResponsiveContainer
        width="100%"
        height="100%"
      >
        <AreaChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="users"
            stroke="#10b981"
            fill="#10b981"
            fillOpacity={0.2}
            strokeWidth={3}
          />

        </AreaChart>
      </ResponsiveContainer>
    </AnalyticsChart>
  );
}
