export default function BusinessHero() {
  return (
    <section className="rounded-3xl bg-white p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="h-20 w-20 rounded-3xl bg-slate-100" />
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-yellow-600">Business</p>
          <h1 className="text-2xl font-semibold">Shree Mess</h1>
          <p className="mt-2 text-sm text-slate-600">Home-style meals • Verified • 4.8</p>
        </div>
      </div>
    </section>
  );
}
