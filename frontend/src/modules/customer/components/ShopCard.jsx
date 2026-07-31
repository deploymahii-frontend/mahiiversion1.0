import { Link } from "react-router-dom";
import { Star, Clock3, MapPin, Heart, BadgePercent, Crown } from "lucide-react";
import { useState } from "react";
import clsx from "clsx";

export default function ShopCard({ shop, onWishlist }) {
  const [liked, setLiked] = useState(shop?.isFavourite ?? false);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const next = !liked;
    setLiked(next);

    onWishlist?.(shop, next);
  };

  return (
    <Link
      to={`/shop/${shop.slug}`}
      className="
        group
        overflow-hidden
        rounded-3xl
        bg-white
        border
        border-slate-200
        shadow-sm
        hover:shadow-xl
        transition-all
        duration-300
        block
      "
    >
      {/* Cover */}
      <div className="relative overflow-hidden">
        <img
          src={shop.coverImage}
          alt={shop.name}
          className="
            h-56
            w-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-110
          "
        />

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className="
            absolute
            top-3
            right-3
            rounded-full
            bg-white/90
            backdrop-blur
            p-2
          "
        >
          <Heart
            size={18}
            className={clsx(
              liked ? "fill-red-500 text-red-500" : "text-slate-600"
            )}
          />
        </button>

        {/* Offer */}
        {shop.offer && (
          <div
            className="
              absolute
              left-3
              bottom-3
              rounded-full
              bg-red-500
              text-white
              px-3
              py-1
              text-xs
              flex
              items-center
              gap-1
            "
          >
            <BadgePercent size={14} />
            {shop.offer}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="font-bold text-lg line-clamp-1">
              {shop.name}
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              {shop.category}
            </p>
          </div>
          {shop.gold && (
            <div
              className="
                flex
                items-center
                gap-1
                rounded-full
                bg-yellow-100
                text-yellow-700
                px-2
                py-1
                text-xs
                font-semibold
              "
            >
              <Crown size={13} />
              Gold
            </div>
          )}
        </div>

        <div className="mt-5 flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-green-600">
            <Star size={16} fill="currentColor" />
            <span>{shop.rating}</span>
            <span className="text-slate-400">({shop.totalReviews})</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock3 size={15} />
            {shop.deliveryTime}
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center text-sm">
          <div className="flex items-center gap-1">
            <MapPin size={15} />
            {shop.distance}
          </div>
          <div className="font-semibold">
            {shop.priceRange}
          </div>
        </div>

        <div className="mt-5 flex justify-between items-center">
          <span
            className={clsx(
              "rounded-full px-3 py-1 text-xs font-semibold",
              shop.isOpen
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            )}
          >
            {shop.isOpen ? "Open Now" : "Closed"}
          </span>

          {shop.freeDelivery && (
            <span
              className="
                rounded-full
                bg-blue-100
                text-blue-700
                px-3
                py-1
                text-xs
                font-semibold
              "
            >
              Free Delivery
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
