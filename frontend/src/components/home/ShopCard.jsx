import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiHeart, FiMapPin, FiNavigation } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function ShopCard({ shop = {} }) {
  const navigate = useNavigate();

  const id = shop._id || shop.id || "mock-1";
  const rawSlug = shop.slug || (shop.name ? shop.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") : id);

  const shopData = {
    id,
    image: shop.coverImage || shop.image || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop",
    name: shop.name || "Kolhapur Local Shop",
    rating: shop.rating ?? 4.8,
    distance: shop.distance || "1.2 km",
    price: shop.averagePrice ?? shop.price ?? "₹150 for two",
    slug: rawSlug,
    open: shop.isOpen ?? shop.open ?? true,
    category: shop.category || "General Store",
    latitude: shop.latitude || 16.705,
    longitude: shop.longitude || 74.2433,
  };

  const [liked, setLiked] = useState(false);

  useEffect(() => {
    try {
      const favorites = JSON.parse(localStorage.getItem("favorite_shops") || "[]");
      setLiked(favorites.includes(shopData.id) || favorites.includes(shopData.slug));
    } catch {
      setLiked(false);
    }
  }, [shopData.id, shopData.slug]);

  const handleToggleLike = (e) => {
    e.stopPropagation();
    try {
      const favorites = JSON.parse(localStorage.getItem("favorite_shops") || "[]");
      let updated;
      if (liked) {
        updated = favorites.filter((item) => item !== shopData.id && item !== shopData.slug);
        toast.error(`Removed ${shopData.name} from favorites`);
      } else {
        updated = [...favorites, shopData.slug];
        toast.success(`Saved ${shopData.name} to favorites ❤️`);
      }
      localStorage.setItem("favorite_shops", JSON.stringify(updated));
      setLiked(!liked);
    } catch {
      setLiked(!liked);
    }
  };

  const handleViewShop = useCallback(() => {
    navigate(`/shop/${shopData.slug}`);
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
      className="w-full rounded-3xl overflow-hidden bg-white dark:bg-slate-800 shadow-md border border-gray-100 dark:border-slate-700/50 flex flex-col justify-between"
    >
      <div>
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
            onClick={handleToggleLike}
            className="absolute top-4 right-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur p-2.5 rounded-full shadow-md hover:scale-110 transition z-10"
          >
            <FiHeart
              className={`text-base transition ${
                liked
                  ? "text-red-500 fill-current scale-110"
                  : "text-gray-600 dark:text-slate-300 hover:text-red-500"
              }`}
            />
          </button>

          <div
            className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-xs font-semibold shadow ${
              shopData.open
                ? "bg-emerald-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {shopData.open ? "Open Now" : "Closed"}
          </div>
        </div>

        <div className="p-5">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1">{shopData.name}</h3>
              <p className="text-xs font-medium text-gray-500 dark:text-slate-400 mt-0.5">{shopData.category}</p>
            </div>

            <div className="flex items-center gap-1 text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-2 py-1 rounded-lg text-xs font-bold">
              <FaStar />
              <span>{shopData.rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-slate-400 mt-3">
            <FiMapPin className="text-orange-500" />
            <span>{shopData.distance}</span>
          </div>

          <div className="mt-2">
            <span className="text-orange-600 dark:text-orange-400 font-bold text-sm">{shopData.price}</span>
          </div>
        </div>
      </div>

      <div className="p-5 pt-0 grid grid-cols-2 gap-3">
        <button
          type="button"
          aria-label={`View ${shopData.name} shop`}
          onClick={handleViewShop}
          className="rounded-xl bg-orange-500 hover:bg-orange-600 text-white py-2.5 text-xs font-bold shadow-md shadow-orange-500/20 transition text-center"
        >
          View Shop
        </button>

        <button
          type="button"
          aria-label={`Open ${shopData.name} in Google Maps`}
          onClick={handleNavigate}
          className="rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-700/50 text-gray-700 dark:text-slate-200 py-2.5 text-xs font-semibold flex justify-center items-center gap-1.5 hover:bg-gray-100 dark:hover:bg-slate-700 transition"
        >
          <FiNavigation />
          <span>Navigate</span>
        </button>
      </div>
    </motion.div>
  );
}
