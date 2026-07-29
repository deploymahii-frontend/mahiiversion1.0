export default function BusinessHero() {
  return (
    <section className="relative overflow-hidden bg-white pb-10">
      <div className="h-72 w-full bg-slate-200" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="-mt-20 rounded-3xl bg-white p-6 shadow-xl sm:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="h-28 w-28 rounded-3xl bg-slate-100" />
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-yellow-600">Restaurant</p>
                <h1 className="text-4xl font-bold">Shree Mess</h1>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-500">
                  <span>⭐ 4.8</span>
                  <span>•</span>
                  <span>0.8 km away</span>
                  <span>•</span>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-emerald-700">Open</span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-blue-100 px-4 py-2 text-sm text-blue-700">Verified</span>
              <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm text-yellow-700">Gold Partner</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
