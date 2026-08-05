import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-[#333] bg-[#0A0A0A] px-4 py-3 shadow-xl">
      <p className="text-xs text-[#888] mb-1.5 font-medium">{label}</p>
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-sm font-semibold text-[#ededed]">
            {entry.name === "revenue"
              ? `₹${Number(entry.value || 0).toLocaleString("en-IN")}`
              : entry.value}
          </span>
        </div>
      ))}
    </div>
  );
};

export default function Charts({ data }) {
  const revenueData = Array.isArray(data?.revenueAnalytics) ? data.revenueAnalytics : [];
  const topShopsData = Array.isArray(data?.topShops) ? data.topShops : [];

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-medium text-[#ededed]">Revenue</h3>
            <p className="text-xs text-[#888] mt-0.5">Monthly revenue overview</p>
          </div>
        </div>

        {revenueData.length === 0 ? (
          <div className="rounded-lg border border-[#222] bg-[#090909] p-10 text-center text-[#888]">
            No revenue analytics available yet.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ededed" stopOpacity={0.15} />
                  <stop offset="100%" stopColor="#ededed" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#222" strokeDasharray="0" vertical={false} />
              <XAxis
                dataKey="month"
                tick={{ fill: "#666", fontSize: 11 }}
                axisLine={{ stroke: "#222" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "#666", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#333", strokeDasharray: "4 4" }} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#ededed"
                strokeWidth={1.5}
                fill="url(#revenueGradient)"
                dot={false}
                activeDot={{ r: 4, fill: "#ededed", stroke: "#000", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-medium text-[#ededed]">Top Shops</h3>
            <p className="text-xs text-[#888] mt-0.5">Highest revenue shops</p>
          </div>
        </div>

        {topShopsData.length === 0 ? (
          <div className="rounded-lg border border-[#222] bg-[#090909] p-10 text-center text-[#888]">
            No top shop analytics available yet.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={topShopsData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }} barGap={8}>
              <CartesianGrid stroke="#222" strokeDasharray="0" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fill: "#666", fontSize: 11 }}
                axisLine={{ stroke: "#222" }}
                tickLine={false}
                interval={0}
                angle={-35}
                textAnchor="end"
              />
              <YAxis
                tick={{ fill: "#666", fontSize: 11 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "#111" }} />
              <Bar dataKey="revenue" fill="#ededed" radius={[6, 6, 0, 0]} maxBarSize={24} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
