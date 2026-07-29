import { FiBell, FiSearch, FiChevronDown } from "react-icons/fi";

export default function Header() {
  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-6">
      <div className="relative w-full max-w-md">
        <FiSearch
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          size={18}
        />

        <input
          type="text"
          placeholder="Search orders, products..."
          className="w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 outline-none focus:border-orange-500"
        />
      </div>

      <div className="ml-6 flex items-center gap-6">
        <button className="relative rounded-xl p-2 transition hover:bg-gray-100">
          <FiBell size={22} />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <button className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-gray-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 font-semibold text-white">
            M
          </div>

          <div className="hidden text-left md:block">
            <p className="font-medium">Mahii Restaurant</p>
            <p className="text-sm text-gray-500">Shop Owner</p>
          </div>

          <FiChevronDown />
        </button>
      </div>
    </header>
  );
}
