import { useState, useEffect } from "react";
import { FiSearch, FiX } from "react-icons/fi";

export default function SearchBar({ value, onChange }) {
    const [searchTerm, setSearchTerm] = useState(value || "");

    useEffect(() => {
        const handler = setTimeout(() => {
            onChange(searchTerm);
        }, 400);

        return () => clearTimeout(handler);
    }, [searchTerm, onChange]);

    return (
        <div className="relative w-full">
            <FiSearch className="absolute left-4 top-3.5 text-gray-400 text-lg" />
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search shops, cafes, messes, or dishes..."
                className="w-full bg-white border border-gray-300 rounded-xl pl-11 pr-10 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-sm"
            />
            {searchTerm && (
                <button
                    type="button"
                    onClick={() => {
                        setSearchTerm("");
                        onChange("");
                    }}
                    className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                >
                    <FiX size={18} />
                </button>
            )}
        </div>
    );
}
