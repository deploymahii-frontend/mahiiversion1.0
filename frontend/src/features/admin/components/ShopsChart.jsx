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

export default function ShopsChart({
  data = [],
}) {
  return (
    <AnalyticsChart
      title="Shops"
      subtitle="Monthly shop registrations"
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
            type="monotone"
            dataKey="shops"
            stroke="#8b5cf6"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />

        </LineChart>
      </ResponsiveContainer>
    </AnalyticsChart>
  );
}
