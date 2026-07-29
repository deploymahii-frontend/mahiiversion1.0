export default function SortBottomSheet() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold">Sort by</p>
      <div className="mt-3 space-y-2 text-sm text-slate-600">
        <div>Nearest</div>
        <div>Rating</div>
        <div>Price</div>
      </div>
    </div>
  );
}
