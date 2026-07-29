import { FiX } from "react-icons/fi";

export default function ActiveFilters({ filters, onRemove, onClearAll }) {
    const filterKeys = Object.keys(filters).filter((k) => filters[k]);

    if (filterKeys.length === 0) return null;

    return (
        <div className="flex flex-wrap items-center gap-2 py-2">
            <span className="text-xs text-gray-500 font-medium">Active Filters:</span>
            {filterKeys.map((key) => (
                <span
                    key={key}
                    className="inline-flex items-center gap-1 bg-yellow-50 text-yellow-800 text-xs px-2.5 py-1 rounded-full border border-yellow-200"
                >
                    <span className="capitalize">{key}: {String(filters[key])}</span>
                    <button
                        onClick={() => onRemove(key)}
                        className="hover:text-yellow-900"
                    >
                        <FiX size={14} />
                    </button>
                </span>
            ))}
            <button
                onClick={onClearAll}
                className="text-xs text-red-600 hover:underline ml-2"
            >
                Clear All
            </button>
        </div>
    );
}
