// src/modules/customer/components/RelatedShops.jsx

import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

export default function RelatedShops({
    shops = [],
}) {
    if (!shops.length) {
        return (
            <p className="text-sm text-gray-500">No related shops available.</p>
        );
    }

    return (
        <div className="space-y-4">
            {shops.map((shop) => (
                <Link
                    key={shop._id || shop.id}
                    to={`/shop/${shop.slug || shop._id}`}
                    className="flex items-center justify-between rounded-3xl border border-gray-200 bg-white px-4 py-4 shadow-sm transition hover:bg-gray-50"
                >
                    <div>
                        <p className="font-semibold text-gray-900">{shop.name}</p>
                        <p className="text-sm text-gray-500">{shop.category}</p>
                    </div>
                    <FaArrowRight className="text-gray-400" />
                </Link>
            ))}
        </div>
    );
}
