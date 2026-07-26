export default function AdminTopbar() {
  return (
    <header className="border-b border-slate-200 bg-white px-6 py-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">Control Center</p>
          <h1 className="text-2xl font-bold">Mahii Admin Dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">Live</div>
          <div className="rounded-3xl bg-slate-100 px-4 py-2 text-sm text-slate-700">Admin</div>
        </div>
      </div>
    </header>
  );
}
