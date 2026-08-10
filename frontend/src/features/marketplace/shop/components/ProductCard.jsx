import { FaStar } from "react-icons/fa";
import { FiShoppingCart, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
import useCart from "../../../../hooks/useCart";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const isAvailable = product.available !== false && product.status !== "INACTIVE" && product.status !== "OUT_OF_STOCK";
  const mainImage = product.images?.[0] || product.image;
  
  const displayPrice = Number(product.price ?? 0);
  const originalPrice = product.discountedPrice ? Number(product.discountedPrice) : null;
  const ratingVal = typeof product.rating === 'number' ? product.rating : (product.rating?.average || 4.5);

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm hover:shadow-md transition flex flex-col justify-between">
      <div>
        <Link to={`/product/${product._id || product.id}`}>
          <div className="relative mb-3 h-44 overflow-hidden rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-800 group">
            {mainImage ? (
              <img
                src={mainImage}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <span className="text-4xl">🍽️</span>
            )}

            {originalPrice && displayPrice < originalPrice && (
              <span className="absolute top-2 left-2 rounded-full bg-rose-500 text-white text-[10px] font-extrabold px-2 py-0.5 shadow-xs">
                OFFER
              </span>
            )}

            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-xs gap-1">
              <FiEye size={16} /> View Details
            </div>
          </div>
        </Link>

        <div className="flex items-center justify-between text-xs mb-1">
          <div className="flex items-center gap-1 text-yellow-500 font-bold">
            <FaStar size={12} />
            <span className="text-gray-700 dark:text-slate-300">{ratingVal}</span>
          </div>
          {product.category && (
            <span className="text-[11px] text-gray-400 dark:text-slate-500 font-semibold uppercase tracking-wider line-clamp-1">
              {product.category?.name || product.category}
            </span>
          )}
        </div>

        <Link to={`/product/${product._id || product.id}`}>
          <h3 className="text-base font-extrabold text-gray-900 dark:text-white line-clamp-1 hover:text-orange-500 transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="mt-1 text-xs text-gray-500 dark:text-slate-400 line-clamp-2 min-h-[32px]">
          {product.description || "No description available"}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 dark:border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-lg font-black text-gray-900 dark:text-white leading-none">
              ₹{displayPrice}
            </p>
            {originalPrice && (
              <p className="text-xs text-gray-400 line-through mt-0.5">
                ₹{originalPrice}
              </p>
            )}
          </div>

          {product.shop?.name && (
            <Link
              to={`/shop/${product.shop.slug || product.shop._id}`}
              className="text-[11px] font-bold text-orange-600 dark:text-orange-400 hover:underline line-clamp-1 max-w-[120px] text-right"
            >
              {product.shop.name}
            </Link>
          )}
        </div>

        <button
          onClick={() => addToCart(product)}
          disabled={!isAvailable}
          className={`flex w-full items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-xs font-extrabold text-white transition ${
            isAvailable
              ? "bg-orange-500 hover:bg-orange-600 shadow-md shadow-orange-500/20"
              : "cursor-not-allowed bg-gray-300 dark:bg-slate-800 text-gray-500"
          }`}
        >
          <FiShoppingCart size={15} />
          {isAvailable ? "Add To Cart" : "Out of Stock"}
        </button>
      </div>
    </div>
  );
}
