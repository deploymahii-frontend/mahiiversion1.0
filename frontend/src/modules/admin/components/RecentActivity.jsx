export default function RecentActivity({ data }) {
  const pendingShops = data?.pendingShops || [];

  const activity = [
    {
      title: "Pending shop approvals",
      detail: `${pendingShops.length} shop${pendingShops.length === 1 ? "" : "s"} awaiting review`,
    },
    {
      title: "Registered platform users",
      detail: `${data?.stats?.users ?? 0} users available in the admin directory`,
    },
    {
      title: "Platform revenue",
      detail: `₹${(data?.stats?.revenue ?? 0).toLocaleString("en-IN")} captured from completed orders`,
    },
  ];

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recent Activity</h2>
        <span className="text-sm text-slate-500">Live updates</span>
      </div>
      <div className="space-y-4">
        {activity.map((item) => (
          <div key={item.title} className="rounded-3xl bg-slate-50 p-4">
            <p className="font-semibold text-slate-900">{item.title}</p>
            <p className="mt-2 text-sm text-slate-600">{item.detail}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
