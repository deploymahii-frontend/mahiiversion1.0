export default function QuickActions() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Quick actions</h2>
      <div className="mt-4 flex flex-wrap gap-3">
        <button className="rounded-full bg-blue-600 px-4 py-2 text-sm font-medium text-white">Track orders</button>
        <button className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">Saved items</button>
        <button className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">Update address</button>
      </div>
    </section>
  );
}
