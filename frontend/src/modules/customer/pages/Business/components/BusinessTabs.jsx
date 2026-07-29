export default function BusinessTabs() {
  return (
    <div className="flex gap-3 rounded-3xl bg-white p-3 shadow-sm">
      <button className="rounded-2xl bg-slate-900 px-4 py-2 text-sm font-medium text-white">Products</button>
      <button className="rounded-2xl px-4 py-2 text-sm font-medium text-slate-600">Services</button>
      <button className="rounded-2xl px-4 py-2 text-sm font-medium text-slate-600">Reviews</button>
    </div>
  );
}
