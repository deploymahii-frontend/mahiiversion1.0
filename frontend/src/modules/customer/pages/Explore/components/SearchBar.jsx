export default function SearchBar() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <input
        type="text"
        placeholder="Search cuisines, services, products..."
        className="w-full border-none bg-transparent text-sm outline-none"
      />
    </div>
  );
}
