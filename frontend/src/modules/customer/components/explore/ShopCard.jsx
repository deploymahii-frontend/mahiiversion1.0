import { Link } from "react-router-dom";
import { FiStar, FiClock, FiMapPin } from "react-icons/fi";

export default function ShopCard({ shop }) {
    const {
        name,
        slug,
        image,
        rating = 4.5,
        distance = "1.2 km",
        deliveryTime = "25-30 min",
        category = "Café & Food",
        offerBadge,
        isGold,
        isOpen = true,
    } = shop;

    return (
        <Link
            to={`/shop/${slug || shop._id}`}
            className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col"
        >
            <div className="relative h-44 w-full overflow-hidden bg-gray-100">
                <img
                    src={image || "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=80"}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {!isOpen && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] flex items-center justify-center">
                        <span className="text-white text-xs font-bold uppercase tracking-wider bg-red-600 px-3 py-1 rounded-full">
                            Currently Closed
                        </span>
                    </div>
                )}
                {offerBadge && (
                    <span className="absolute top-3 left-3 bg-yellow-500 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
                        {offerBadge}
                    </span>
                )}
                {isGold && (
                    <span className="absolute top-3 right-3 bg-gradient-to-r from-amber-400 to-yellow-600 text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-sm">
                        GOLD
                    </span>
                )}
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="font-bold text-gray-900 group-hover:text-yellow-600 transition-colors line-clamp-1">
                            {name}
                        </h3>
                        <div className="flex items-center gap-1 bg-green-50 text-green-700 px-2 py-0.5 rounded text-xs font-bold shrink-0">
                            <FiStar size={12} className="fill-current" />
                            <span>{rating}</span>
                        </div>
                    </div>

                    <p className="text-xs text-gray-500 mb-3">{category}</p>
                </div>

                <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                        <FiMapPin size={13} className="text-gray-400" />
                        <span>{distance}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FiClock size={13} className="text-gray-400" />
                        <span>{deliveryTime}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
