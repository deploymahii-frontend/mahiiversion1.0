export default function SortDropdown({ value, onChange }) {
    const options = [
        { label: "Relevance", value: "relevance" },
        { label: "Rating (High to Low)", value: "rating" },
        { label: "Price (Low to High)", value: "price_asc" },
        { label: "Price (High to Low)", value: "price_desc" },
        { label: "Newest", value: "newest" },
        { label: "Popularity", value: "popularity" },
    ];

    return (
        <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 font-medium hidden sm:inline">Sort By:</span>
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="bg-white border border-gray-300 rounded-lg px-3 py-2 text-xs sm:text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-sm"
            >
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
