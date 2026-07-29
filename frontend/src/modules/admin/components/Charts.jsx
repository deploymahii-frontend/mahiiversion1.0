export default function Charts() {
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
        <h2 className="text-xl font-semibold">Revenue</h2>
        <div className="mt-8 h-64 rounded-3xl bg-slate-100" />
      </div>
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Growth</h2>
        <div className="mt-8 h-64 rounded-3xl bg-slate-100" />
      </div>
    </section>
  );
}
