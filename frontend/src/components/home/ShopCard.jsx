import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FiHeart, FiMapPin, FiNavigation } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

export default function ShopCard({ shop }) {
  const navigate = useNavigate();

  const shopData = {
    image: shop.coverImage || shop.image || "/images/shop-placeholder.jpg",
    name: shop.name || "Unknown Shop",
    rating: shop.rating ?? "New",
    distance: shop.distance || "Nearby",
    price: shop.averagePrice ?? shop.price ?? "₹--",
    slug: shop.slug,
    open: shop.open,
    category: shop.category || "Shop",
    latitude: shop.latitude,
    longitude: shop.longitude,
  };

  const handleViewShop = useCallback(() => {
    if (shopData.slug) {
      navigate(`/shop/${shopData.slug}`);
    }
  }, [navigate, shopData.slug]);

  const handleNavigate = useCallback(() => {
    const { latitude, longitude, name } = shopData;

    const url = latitude && longitude
      ? `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  }, [shopData.latitude, shopData.longitude, shopData.name]);

  return (
    <motion.div
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      className="w-full max-w-sm rounded-3xl overflow-hidden bg-white shadow-lg"
    >
      <div className="relative">
        <img
          src={shopData.image}
          alt={shopData.name}
          loading="lazy"
          className="w-full h-48 object-cover"
        />

        <button
          type="button"
          aria-label="Add shop to favorites"
          className="absolute top-4 right-4 bg-white p-2 rounded-full shadow"
        >
          <FiHeart className="text-gray-600" />
        </button>

        <div
          className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-semibold ${
            shopData.open
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {shopData.open ? "Open Now" : "Closed"}
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold">{shopData.name}</h3>
            <p className="text-gray-500 mt-1">{shopData.category}</p>
          </div>

          <div className="flex items-center gap-1 text-yellow-500">
            <FaStar />
            <span className="font-semibold">{shopData.rating}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-500 mt-4">
          <FiMapPin />
          <span>{shopData.distance}</span>
        </div>

        <div className="mt-3">
          <span className="text-orange-600 font-bold text-lg">{shopData.price}</span>
        </div>

        <div className="grid grid-cols-2 gap-3 mt-5">
          <button
            type="button"
            aria-label={`View ${shopData.name} shop`}
            onClick={handleViewShop}
            className="rounded-xl bg-orange-500 text-white py-3 font-semibold hover:bg-orange-600 transition"
          >
            View Shop
          </button>

          <button
            type="button"
            aria-label={`Open ${shopData.name} in Google Maps`}
            onClick={handleNavigate}
            className="rounded-xl border border-gray-200 py-3 flex justify-center items-center gap-2 hover:bg-gray-100 transition"
          >
            <FiNavigation />
            Navigate
          </button>
        </div>
      </div>
    </motion.div>
  );
}
