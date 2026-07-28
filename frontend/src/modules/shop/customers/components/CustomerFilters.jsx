import { Search, LayoutGrid, List } from "lucide-react";

export default function CustomerFilters({
    search,
    onSearchChange,
    filter,
    onFilterChange,
    viewMode,
    onViewModeChange,
}) {
    return (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
            <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                    type="text"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search by name, phone, or email..."
                    className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
                <select
                    value={filter}
                    onChange={(e) => onFilterChange(e.target.value)}
                    className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="ALL">All Customers</option>
                    <option value="VIP">VIP Members (20+ Orders)</option>
                    <option value="GOLD">Gold Customers (10+ Orders)</option>
                    <option value="REGULAR">Regular (3+ Orders)</option>
                    <option value="BLOCKED font">Blocked</option>
                </select>

                <div className="flex items-center bg-gray-100 p-1 rounded-xl">
                    <button
                        onClick={() => onViewModeChange("grid")}
                        className={`p-2 rounded-lg text-sm font-medium transition ${
                            viewMode === "grid" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"
                        }`}
                        title="Grid View"
                    >
                        <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onViewModeChange("table")}
                        className={`p-2 rounded-lg text-sm font-medium transition ${
                            viewMode === "table" ? "bg-white text-blue-600 shadow-sm" : "text-gray-500"
                        }`}
                        title="Table View"
                    >
                        <List className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
