export default function SystemStatus({ data }) {
  const pendingShops = Array.isArray(data?.pendingShops) ? data.pendingShops.length : 0;
  const pendingActions = Array.isArray(data?.pendingActions) ? data.pendingActions.length : 0;

  const statuses = [
    { label: "API Health", state: "Operational", color: "text-emerald-400", dot: "bg-emerald-400" },
    { label: "Pending Shops", state: `${pendingShops} awaiting review`, color: "text-amber-400", dot: "bg-amber-400" },
    { label: "Pending Actions", state: `${pendingActions} items`, color: "text-blue-400", dot: "bg-blue-400" },
    { label: "Revenue", state: Array.isArray(data?.revenueAnalytics) && data.revenueAnalytics.length ? "Tracked" : "Not available", color: "text-purple-400", dot: "bg-purple-400" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-[#ededed]">System Status</h3>
      </div>
      <div className="space-y-2.5">
        {statuses.map((item) => (
          <div key={item.label} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${item.dot}`} />
              <span className="text-[13px] text-[#888]">{item.label}</span>
            </div>
            <span className={`text-xs font-mono ${item.color}`}>{item.state}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
