import { FiSearch } from "react-icons/fi";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative">
      <FiSearch
        className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
        size={20}
      />

      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search shops, cafes, restaurants..."
        className="w-full bg-white rounded-2xl shadow-md py-4 pl-14 pr-5 outline-none border border-gray-100 focus:border-orange-500"
      />
    </div>
  );
}
