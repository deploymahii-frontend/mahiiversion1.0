import { useState } from "react";
import { FaStar, FaStore } from "react-icons/fa";
import { FiCheckCircle, FiXCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function ProductHero({ product }) {
  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const [selectedImage, setSelectedImage] = useState(images[0] || null);

  const displayPrice = Number(product.price ?? 0);
  const originalPrice = product.discountedPrice ? Number(product.discountedPrice) : null;
  const ratingVal = typeof product.rating === "number" ? product.rating : (product.rating?.average || 4.5);
  const totalReviews = typeof product.totalReviews === "number" ? product.totalReviews : (product.rating?.totalReviews || 12);
  const isAvailable = product.available !== false && product.status !== "INACTIVE" && product.status !== "OUT_OF_STOCK";
  const stockQty = product.inventory?.quantity ?? 100;

  return (
    <section className="bg-white dark:bg-slate-900 border-b border-gray-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 p-6 sm:p-10">

        {/* Gallery Column */}
        <div className="space-y-4">
          <div className="rounded-3xl shadow-lg border border-gray-100 dark:border-slate-800 overflow-hidden h-[380px] sm:h-[460px] bg-slate-50 dark:bg-slate-800 flex items-center justify-center relative">
            {selectedImage ? (
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-6xl">🍽️</span>
            )}

            {originalPrice && displayPrice < originalPrice && (
              <span className="absolute top-4 left-4 bg-rose-500 text-white font-extrabold text-xs px-3 py-1.5 rounded-full shadow-md">
                {Math.round(((originalPrice - displayPrice) / originalPrice) * 100)}% OFF
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 flex-shrink-0 transition ${
                    selectedImage === img
                      ? "border-orange-500 ring-2 ring-orange-500/20"
                      : "border-gray-200 dark:border-slate-700 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Meta Column */}
        <div className="flex flex-col justify-center space-y-5">
          {/* Category & Status Pills */}
          <div className="flex items-center gap-3 flex-wrap">
            {product.category && (
              <span className="bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 border border-orange-100 dark:border-orange-900/50 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                {product.category?.name || product.category}
              </span>
            )}

            <span
              className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 ${
                isAvailable
                  ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50"
                  : "bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900/50"
              }`}
            >
              {isAvailable ? <FiCheckCircle size={14} /> : <FiXCircle size={14} />}
              {isAvailable ? `In Stock (${stockQty} left)` : "Currently Unavailable"}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
            {product.name}
          </h1>

          {/* Ratings & Shop Link */}
          <div className="flex flex-wrap items-center gap-6 text-sm">
            <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/40 px-3 py-1.5 rounded-xl border border-amber-100 dark:border-amber-900/50">
              <FaStar className="text-yellow-500" size={16} />
              <span className="font-extrabold text-gray-900 dark:text-white">{ratingVal}</span>
              <span className="text-gray-400 text-xs">({totalReviews} reviews)</span>
            </div>

            {product.shop && (
              <Link
                to={`/shop/${product.shop.slug || product.shop._id || product.shop.id}`}
                className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-bold hover:underline"
              >
                <FaStore size={15} />
                <span>{product.shop.name || "Visit Partner Shop"}</span>
              </Link>
            )}
          </div>

          {/* Price Block */}
          <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
            <div className="flex items-baseline gap-4">
              <span className="text-4xl font-black text-gray-900 dark:text-white">
                ₹{displayPrice}
              </span>
              {originalPrice && (
                <span className="text-xl text-gray-400 line-through font-semibold">
                  ₹{originalPrice}
                </span>
              )}
            </div>
            {product.sku && (
              <p className="text-xs text-gray-400 dark:text-slate-500 mt-2 font-mono">
                Item Code / SKU: {product.sku}
              </p>
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
