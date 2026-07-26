export default function AccountMenu() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Account</h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">Profile settings</div>
        <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">Payment methods</div>
      </div>
    </section>
  );
}
