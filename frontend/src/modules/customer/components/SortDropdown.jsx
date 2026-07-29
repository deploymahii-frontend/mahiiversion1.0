// src/modules/customer/components/SortDropdown.jsx

const sortOptions = [
    { value: "recommended", label: "Recommended" },
    { value: "nearest", label: "Nearest" },
    { value: "highest-rated", label: "Highest Rated" },
    { value: "trend", label: "Trending" },
    { value: "newest", label: "Newest" },
    { value: "best-value", label: "Best Value" },
];

export default function SortDropdown({
    currentSort = "recommended",
    onSortChange = () => {},
}) {
    return (
        <div className="relative inline-block text-left">
            <select
                value={currentSort}
                onChange={(event) => onSortChange(event.target.value)}
                className="rounded-3xl border border-gray-200 bg-white px-4 py-3 pr-10 text-sm shadow-sm focus:border-blue-500 focus:outline-none"
            >
                {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
