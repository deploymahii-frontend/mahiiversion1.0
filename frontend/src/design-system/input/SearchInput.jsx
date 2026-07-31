import { FiSearch } from "react-icons/fi";

export default function SearchInput({
    value,
    onChange,
}) {
    return (
        <div className="bg-gray-100 rounded-2xl flex items-center px-4 py-3">
            <FiSearch className="text-gray-400" />
            <input
                value={value}
                onChange={onChange}
                placeholder="Search restaurants, cafes, mess..."
                className="ml-3 bg-transparent outline-none w-full"
            />
        </div>
    );
}
