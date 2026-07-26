const statuses = [
  { label: "API Health", state: "Operational" },
  { label: "Payments", state: "Stable" },
  { label: "Reports", state: "Updated" },
  { label: "Moderation Queue", state: "15 pending" },
];

export default function SystemStatus() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold">System Status</h2>
        <span className="text-sm text-slate-500">Platform overview</span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {statuses.map((item) => (
          <div key={item.label} className="rounded-3xl bg-slate-50 p-4">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">{item.label}</p>
            <p className="mt-3 text-lg font-semibold text-slate-900">{item.state}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
