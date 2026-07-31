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
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
      onClick={handleViewShop}
      className="max-w-[220px] w-full rounded-2xl overflow-hidden bg-white dark:bg-slate-800 shadow-sm border border-gray-100 dark:border-slate-700/50 flex flex-col justify-between cursor-pointer"
    >
      <div>
        <div className="relative">
            <img
              src={shopData.image}
              alt={shopData.name}
              loading="lazy"
              className="w-full h-32 sm:h-40 object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop";
              }}
            />

          <button
            type="button"
            aria-label="Add shop to favorites"
            onClick={handleToggleLike}
            className="absolute top-2 right-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur p-2 rounded-full shadow-sm hover:scale-110 transition z-10"
          >
            <FiHeart
              size={14}
              className={`transition ${
                liked
                  ? "text-red-500 fill-current scale-110"
                  : "text-gray-600 dark:text-slate-300 hover:text-red-500"
              }`}
            />
          </button>

            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="transition-colors">
              {shopData.open ? "Open" : "Closed"}
            </motion.span>
        </div>

        <div className="p-3">
          <div className="flex justify-between items-start gap-2">
            <div className="overflow-hidden">
              <h3 className="text-sm font-bold text-gray-900 dark:text-white line-clamp-2 leading-snug">{shopData.name}</h3>
            </div>

            <div className="flex-shrink-0 flex items-center gap-1 text-amber-500 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded text-[10px] font-bold">
              <FaStar size={10} />
              <span>{shopData.rating}</span>
            </div>
          </div>

          <p className="text-[10px] sm:text-xs font-medium text-gray-500 dark:text-slate-400 mt-1 line-clamp-1">{shopData.category}</p>

          <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500 dark:text-slate-400 mt-1.5">
            <FiMapPin className="text-orange-500" size={10} />
            <span className="truncate">{shopData.distance}</span>
          </div>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-orange-600 dark:text-orange-400 font-bold text-xs sm:text-sm">{shopData.price}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
