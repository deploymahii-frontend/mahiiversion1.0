export default function FilterDrawer() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="text-lg font-semibold">Filters</h3>
      <div className="mt-4 space-y-3 text-sm text-slate-600">
        <div>Open now</div>
        <div>Delivery available</div>
        <div>Verified businesses</div>
      </div>
    </div>
  );
}
