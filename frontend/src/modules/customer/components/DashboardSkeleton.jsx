export default function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Hero Banner skeleton */}
      <div className="h-56 rounded-3xl bg-slate-200" />

      {/* Offer Carousel skeleton */}
      <div className="h-40 rounded-3xl bg-slate-200" />

      {/* Category slider skeleton */}
      <div className="grid grid-cols-4 lg:grid-cols-7 gap-4">
        {[1, 2, 3, 4, 5, 6, 7].map((item) => (
          <div key={item} className="h-24 rounded-2xl bg-slate-200" />
        ))}
      </div>

      {/* Shop cards skeleton */}
      <div className="grid lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div key={item} className="h-80 rounded-3xl bg-slate-200" />
        ))}
      </div>

      {/* Wallet + orders skeleton */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="h-36 rounded-3xl bg-slate-200" />
        <div className="h-36 rounded-3xl bg-slate-200" />
      </div>
    </div>
  );
}
