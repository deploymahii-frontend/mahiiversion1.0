import { Search, ScanLine } from "lucide-react";

export default function SearchBar() {
    return (
        <div className="bg-white rounded-2xl shadow-sm p-3">
            <div className="flex items-center">
                <Search size={20} className="text-gray-400" />
                <input
                    placeholder="Search restaurants, cafes, products..."
                    className="flex-1 ml-3 outline-none"
                />
                <button>
                    <ScanLine />
                </button>
            </div>
        </div>
    );
}
