export default function ProductActions() {
  return (
    <div className="flex flex-wrap gap-3 rounded-3xl bg-white p-4 shadow-sm">
      <button className="rounded-full bg-yellow-500 px-4 py-2 text-sm font-medium text-white">Add to cart</button>
      <button className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">Buy now</button>
    </div>
  );
}
