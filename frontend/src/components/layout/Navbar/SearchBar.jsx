import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex w-full items-center rounded-xl border border-slate-300 px-4">
      <Search size={18} />
      <input
        className="flex-1 bg-transparent p-3 outline-none"
        placeholder="Search shops, products, services..."
      />
    </div>
  );
}
