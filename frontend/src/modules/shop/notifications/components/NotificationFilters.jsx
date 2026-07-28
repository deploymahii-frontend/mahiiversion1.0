export default function NotificationFilters({
    onFilter,
}) {
    return (
        <div className="bg-white rounded-xl p-4 flex gap-3">
            <select
                onChange={e => onFilter({ type: e.target.value })}
                className="border rounded p-2"
            >
                <option value="">All</option>
                <option value="ORDER">Order</option>
                <option value="INVENTORY">Inventory</option>
                <option value="PROMOTION">Promotion</option>
            </select>

            <button
                onClick={() => onFilter({ read: false })}
                className="bg-blue-600 text-white px-3 py-1 rounded"
            >
                Unread
            </button>

        </div>
    );
}
