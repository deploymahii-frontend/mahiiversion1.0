export default function DashboardHeader() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <p className="text-sm uppercase tracking-[0.2em] text-blue-600">Customer dashboard</p>
      <h1 className="mt-2 text-2xl font-semibold">Welcome back</h1>
      <p className="mt-2 text-sm text-slate-600">Manage orders, saved businesses, and your account.</p>
    </section>
  );
}
