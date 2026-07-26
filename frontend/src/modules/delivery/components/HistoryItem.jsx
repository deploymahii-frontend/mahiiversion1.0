export default function HistoryItem({ item }) {
    return (
        <div className="mb-4 rounded-xl bg-white p-4 shadow">
            <h3 className="font-semibold">{item.title || "History item"}</h3>
            <p className="text-sm text-gray-600">{item.description || "Details"}</p>
            <p className="mt-2 text-xs text-gray-500">{item.date || "Date"}</p>
        </div>
    );
}
