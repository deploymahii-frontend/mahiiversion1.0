export default function MomentFeed() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold">Mahii Moments</h3>
      <div className="mt-4 space-y-3">
        <div className="rounded-2xl bg-slate-100 p-4">
          <p className="font-medium">Weekend brunch vibes</p>
          <p className="mt-1 text-sm text-slate-600">Trending around your area</p>
        </div>
        <div className="rounded-2xl bg-slate-100 p-4">
          <p className="font-medium">Festival specials</p>
          <p className="mt-1 text-sm text-slate-600">Popular this week</p>
        </div>
      </div>
    </div>
  );
}
