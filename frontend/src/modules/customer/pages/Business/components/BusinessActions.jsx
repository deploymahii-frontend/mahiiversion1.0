export default function BusinessActions() {
  return (
    <div className="flex flex-wrap gap-3 rounded-3xl bg-white p-4 shadow-sm">
      <button className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white">Call</button>
      <button className="rounded-full bg-yellow-500 px-4 py-2 text-sm font-medium text-white">Save</button>
      <button className="rounded-full bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700">Share</button>
    </div>
  );
}
