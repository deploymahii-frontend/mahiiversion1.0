import { FiBell, FiUser, FiSearch, FiHelpCircle } from "react-icons/fi";

export default function AdminTopbar() {
  return (
    <header className="border-b border-gray-200 bg-white px-6 py-3 sticky top-0 z-10">
      <div className="flex items-center justify-between gap-4">
        
        <div className="text-xl font-medium text-[#1f2937]">
          Project Overview
        </div>
        
        <div className="flex-1 max-w-xl hidden md:flex">
          <div className="relative w-full">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search by ID, business name, or user..." 
              className="w-full bg-[#f1f3f4] text-[13px] border-transparent focus:bg-white focus:border-[#1a73e8] focus:ring-1 focus:ring-[#1a73e8] rounded-md py-2 pl-9 pr-4 transition-colors outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-5 text-gray-500">
          <button aria-label="Help" className="hover:text-gray-800 transition-colors">
            <FiHelpCircle size={20} />
          </button>
          <button aria-label="Notifications" className="hover:text-gray-800 transition-colors relative">
            <FiBell size={20} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1.5 rounded-full transition-colors border border-transparent hover:border-gray-200">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-[#1a73e8] font-bold text-sm">
              AD
            </div>
          </div>
        </div>
        
      </div>
    </header>
  );
}
