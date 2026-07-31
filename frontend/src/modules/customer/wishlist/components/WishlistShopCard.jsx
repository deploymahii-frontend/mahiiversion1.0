import { Heart, Star, MapPin, Clock, Tag } from "lucide-react";
import { Link } from "react-router-dom";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800",
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800",
  "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800",
];

export default function WishlistShopCard({ shop, onRemove, index = 0 }) {
  if (!shop) return null;

  const id = shop._id || shop.id;
  const image =
    shop.coverImage ||
    shop.image ||
    FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];
  const name = shop.name || "Mahii Partner Shop";
  const slug =
    shop.slug ||
    (name ? name.toLowerCase().replace(/[^a-z0-9]+/g, "-") : id);
  const category = shop.category || shop.cuisine || "Student Mess & Dining";
  const rating = shop.rating ?? 4.8;
  const distance = shop.distance || "450 m";
  const deliveryTime = shop.deliveryTime || "15-20 min";
  const price = shop.price || shop.priceRange || shop.averagePrice || "₹80 Meal";
  const isOpen = shop.isOpen ?? shop.open ?? true;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm hover:shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300 group relative flex flex-col">
      {/* Remove from wishlist */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onRemove?.(id);
        }}
        className="absolute top-3.5 right-3.5 z-10 p-2.5 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-rose-500 hover:bg-white dark:hover:bg-slate-800 transition-all shadow-md"
        title="Remove from Wishlist"
      >
        <Heart size={18} className="fill-rose-500 text-rose-500" />
      </button>

      <Link to={`/shop/${slug}`} className="flex flex-col flex-1">
        {/* Cover Image */}
        <div className="h-48 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = FALLBACK_IMAGES[0];
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          {/* Open / Closed badge */}
          <span
            className={`absolute bottom-3 left-3 text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full shadow-sm ${
              isOpen
                ? "bg-emerald-500 text-white"
                : "bg-rose-600 text-white"
            }`}
          >
            {isOpen ? "Open Now" : "Closed"}
          </span>
        </div>

        {/* Card Body */}
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-lg leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition truncate">
                {name}
              </h3>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                {category}
              </p>
            </div>
            <span className="flex-shrink-0 inline-flex items-center gap-1 font-black text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-900/40">
              <Star size={12} className="fill-amber-500 text-amber-500" />
              {rating}
            </span>
          </div>

          {/* Stats row */}
          <div className="mt-auto pt-4 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
            <span className="flex items-center gap-1 font-medium">
              <MapPin size={13} className="text-blue-500" />
              {distance}
            </span>

            <span className="flex items-center gap-1 font-medium">
              <Clock size={13} />
              {deliveryTime}
            </span>

            <span className="flex items-center gap-1 font-bold text-orange-600 dark:text-orange-400">
              <Tag size={12} className="text-emerald-500" />
              {price}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
}
