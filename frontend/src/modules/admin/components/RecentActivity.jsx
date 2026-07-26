const activity = [
  { title: "New support ticket", detail: "Ticket #5821 created by customer" },
  { title: "New business verification", detail: "Shree Mess approved" },
  { title: "Order spike", detail: "Orders up 18% this hour" },
];

export default function RecentActivity() {
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
