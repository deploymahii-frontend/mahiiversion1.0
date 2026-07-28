export default function LowStockBadge({ stock }) {

    if (stock <= 0)
        return (
            <span className="bg-red-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                Out of Stock
            </span>
        );

    if (stock <= 10)
        return (
            <span className="bg-yellow-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                Low Stock
            </span>
        );

    return (
        <span className="bg-green-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            In Stock
        </span>
    );
}
