import { useShopAnalytics } from "../hooks/useShopOwner";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

function StatCard({ label, value, sub }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-5">
      <p className="text-sm font-semibold text-slate-400 dark:text-slate-500">{label}</p>
      <p className="text-3xl font-black text-slate-900 dark:text-white mt-1">{value}</p>
      {sub && <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{sub}</p>}
    </div>
  );
}

export default function ShopOwnerAnalytics() {
  const { data, isLoading } = useShopAnalytics(30);

  if (isLoading) return (
    <div className="space-y-6 animate-pulse">
      <div className="grid grid-cols-3 gap-5">
        {[...Array(3)].map((_, i) => <div key={i} className="h-28 bg-slate-200 dark:bg-slate-800 rounded-2xl" />)}
      </div>
      <div className="h-72 bg-slate-200 dark:bg-slate-800 rounded-2xl" />
    </div>
  );

  const revenue  = data?.revenue  || [];
  const topProds = data?.topProducts || [];

  const totalRev = revenue.reduce((s, r) => s + r.revenue, 0);
  const totalOrd = revenue.reduce((s, r) => s + r.orders,  0);
  const avgOrder = totalOrd ? Math.round(totalRev / totalOrd) : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Analytics</h1>
        <p className="text-slate-400 dark:text-slate-500 mt-1">Last 30 days performance overview</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-5">
        <StatCard label="Total Revenue"  value={`₹${totalRev.toLocaleString()}`}  sub="Last 30 days" />
        <StatCard label="Total Orders"   value={totalOrd}                          sub="Delivered" />
        <StatCard label="Avg Order Value" value={`₹${avgOrder}`}                  sub="Per order" />
      </div>

      {/* Revenue Chart */}
      {revenue.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Daily Revenue</h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={revenue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="_id" tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <Tooltip
                formatter={(v) => [`₹${v.toLocaleString()}`, "Revenue"]}
                contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
              />
              <Line type="monotone" dataKey="revenue" stroke="#0f172a" strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Top Products */}
      {topProds.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Top Selling Products</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={topProds.slice(0, 8)} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis type="number" tick={{ fontSize: 11, fill: "#94a3b8" }} />
              <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 11, fill: "#64748b" }} />
              <Tooltip
                formatter={(v) => [v, "Units Sold"]}
                contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0" }}
              />
              <Bar dataKey="totalQuantity" fill="#0f172a" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {revenue.length === 0 && topProds.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <p className="text-5xl mb-3">📊</p>
          <p className="font-bold text-slate-700 dark:text-slate-300">No analytics data yet</p>
          <p className="text-slate-400 dark:text-slate-500 text-sm mt-1">Analytics will appear once you receive delivered orders</p>
        </div>
      )}
    </div>
  );
}
