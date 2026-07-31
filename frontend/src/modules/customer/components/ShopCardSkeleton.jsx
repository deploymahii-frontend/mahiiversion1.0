export default function ShopCardSkeleton() {
  return (
    <div className="animate-pulse rounded-3xl bg-white p-4 shadow-sm">
      <div className="h-52 rounded-2xl bg-slate-200" />
      <div className="mt-5 h-5 w-3/4 rounded bg-slate-200" />
      <div className="mt-3 h-4 w-1/2 rounded bg-slate-200" />
      <div className="mt-6 flex justify-between">
        <div className="h-4 w-20 rounded bg-slate-200" />
        <div className="h-4 w-16 rounded bg-slate-200" />
      </div>
    </div>
  );
}
