import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-4 text-gray-400" size={20} />
      <input
        className="w-full rounded-2xl bg-white py-4 pl-12 pr-5 shadow-lg outline-none"
        placeholder="Search businesses, products, services..."
      />
    </div>
  );
}
