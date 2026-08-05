import { FiBell, FiSearch, FiUser } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

export default function AdminTopbar() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-[#222] bg-[#000000] px-4 md:px-8">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-full max-w-xs hidden md:block">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#888]" size={16} />
          <input
            type="text"
            placeholder="Search..."
            className="w-full rounded-md border border-[#333] bg-[#0A0A0A] py-1.5 pl-9 pr-4 text-sm text-[#EDEDED] placeholder-[#666] focus:border-[#888] focus:outline-none focus:ring-1 focus:ring-[#888] transition-all"
          />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <button className="relative text-[#888] hover:text-[#EDEDED] transition-colors">
          <FiBell size={18} />
          <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-500 text-[9px] font-bold text-white border border-[#000]">
            3
          </span>
        </button>
        <div className="flex items-center gap-2 border-l border-[#222] pl-4">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-gray-700 to-gray-900 text-xs font-bold text-white ring-1 ring-[#333]">
            {user?.fullName?.charAt(0) || "A"}
          </div>
        </div>
      </div>
    </header>
  );
}
