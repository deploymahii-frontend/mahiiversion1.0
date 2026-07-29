// src/modules/customer/components/ShopCard.jsx

import { Link } from "react-router-dom";
import { FaStar, FaMapMarkerAlt, FaClock } from "react-icons/fa";

export default function ShopCard({ shop }) {
    const {
        _id,
        slug,
        name,
        image,
        category,
        rating,
        distance,
        deliveryTime,
        isOpen = true,
        offerLabel,
    } = shop;

    return (
        <Link
            to={`/shop/${slug || _id}`}
            className="group block overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
        >
            <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                <img
                    src={image || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80"}
                    alt={name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                {offerLabel && (
                    <span className="absolute left-4 top-4 rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-white">
                        {offerLabel}
                    </span>
                )}
                {!isOpen && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center">
                        <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-gray-800">
                            Closed
                        </span>
                    </div>
                )}
            </div>
            <div className="p-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">{name}</h3>
                        <p className="text-sm text-gray-500">{category}</p>
                    </div>
                    {rating !== undefined && (
                        <div className="flex items-center gap-1 rounded-2xl bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                            <FaStar className="text-yellow-500" />
                            {rating}
                        </div>
                    )}
                </div>
                <div className="grid gap-3 text-sm text-gray-600 sm:grid-cols-2">
                    <div className="flex items-center gap-2">
                        <FaMapMarkerAlt />
                        <span>{distance || "Nearby"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <FaClock />
                        <span>{deliveryTime || "30 min"}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
