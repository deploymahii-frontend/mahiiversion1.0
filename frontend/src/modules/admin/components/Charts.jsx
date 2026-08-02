export default function Charts({ data }) {
  const revenueData = data?.analytics?.revenueByDay || [];
  const maxValue = Math.max(...revenueData.map((item) => item.total || 0), 1);

  return (
    <section className="grid gap-4 lg:grid-cols-3">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
        <h2 className="text-xl font-semibold">Revenue</h2>
        <div className="mt-6 flex h-64 items-end gap-2 rounded-3xl bg-slate-50 p-4">
          {revenueData.length === 0 ? (
            <div className="flex h-full w-full items-center justify-center text-sm text-slate-500">No revenue data yet.</div>
          ) : (
            revenueData.map((item) => (
              <div key={item.date} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t-md bg-blue-500" style={{ height: `${Math.max(8, (item.total / maxValue) * 100)}%` }} />
                <span className="text-xs text-slate-500">{item.date?.slice(5)}</span>
              </div>
            ))
          )}
        </div>
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Snapshot</h2>
        <div className="mt-6 space-y-3 text-sm text-slate-600">
          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="text-slate-500">Users</p>
            <p className="text-xl font-semibold text-slate-900">{data?.stats?.users ?? 0}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="text-slate-500">Shops</p>
            <p className="text-xl font-semibold text-slate-900">{data?.stats?.shops ?? 0}</p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-3">
            <p className="text-slate-500">Orders</p>
            <p className="text-xl font-semibold text-slate-900">{data?.stats?.orders ?? 0}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
