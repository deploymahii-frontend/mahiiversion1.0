import { useState, useMemo } from "react";
import { FaPlus, FaMinus, FaStar } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import useCart from "../../hooks/useCart";

export default function MenuSection({ products = [] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const { items: cartItems = [], addToCart, updateQuantity, removeFromCart } = useCart();

  const safeProducts = Array.isArray(products) ? products : [];

  // Group categories dynamically
  const categories = useMemo(() => {
    const cats = new Set(
      safeProducts.map((p) => p?.category?.name || p?.category || "General")
    );
    return ["All", ...Array.from(cats)];
  }, [safeProducts]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return safeProducts;
    return safeProducts.filter(
      (p) => (p?.category?.name || p?.category || "General") === activeCategory
    );
  }, [safeProducts, activeCategory]);

  const getCartQuantity = (productId) => {
    const found = cartItems.find(
      (item) => (item.product?._id || item.product?.id || item.product) === productId
    );
    return found ? found.quantity : 0;
  };

  if (safeProducts.length === 0) {
    return (
      <section className="py-10" id="products">
        <div className="bg-slate-50 dark:bg-slate-900/50 rounded-3xl p-12 text-center border border-dashed border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No Products Listed Yet</h3>
          <p className="text-xs text-gray-500 dark:text-slate-400 max-w-sm mx-auto">
            This shop has not uploaded any active products to their public catalog yet. Check back soon!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8" id="products">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            Shop Catalog & Menu 🛒
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-slate-400 mt-1">
            Browse items, select quantities, and order directly from this store.
          </p>
        </div>
      </div>

      {/* Category Pills (Horizontal Scroll) */}
      <div className="flex gap-2.5 overflow-x-auto pb-3 scrollbar-hide sticky top-16 bg-white/90 dark:bg-slate-950/90 backdrop-blur z-20 py-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-extrabold transition-all shadow-xs ${
              activeCategory === cat
                ? "bg-orange-500 text-white shadow-md shadow-orange-500/20"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
            }`}
          >
            {typeof cat === "string" ? cat.toUpperCase() : "GENERAL"}
          </button>
        ))}
      </div>

      {/* Product Grid: 4 cols (lg), 3 cols (md), 2 cols (sm) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
        {filteredProducts.map((product) => {
          const pId = product._id || product.id;
          const cartQty = getCartQuantity(pId);
          const isAvailable =
            product.available !== false &&
            product.status !== "INACTIVE" &&
            product.status !== "OUT_OF_STOCK";

          const displayPrice = Number(product.price ?? 0);
          const originalPrice = product.discountedPrice ? Number(product.discountedPrice) : null;
          const mainImage = product.images?.[0] || product.image;
          const ratingVal = typeof product.rating === "number" ? product.rating : (product.rating?.average || 4.5);

          return (
            <div
              key={pId}
              className="rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 shadow-xs hover:shadow-md transition flex flex-col justify-between group"
            >
              <div>
                <Link to={`/product/${product.slug || pId}`}>
                  <div className="relative mb-3 h-36 sm:h-40 overflow-hidden rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-800">
                    {mainImage ? (
                      <img
                        src={mainImage}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <span className="text-3xl">🍽️</span>
                    )}

                    {originalPrice && displayPrice < originalPrice && (
                      <span className="absolute top-2 left-2 rounded-full bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 shadow-sm">
                        {Math.round(((originalPrice - displayPrice) / originalPrice) * 100)}% OFF
                      </span>
                    )}
                  </div>
                </Link>

                <div className="flex items-center justify-between text-[11px] mb-1">
                  <div className="flex items-center gap-1 text-yellow-500 font-bold">
                    <FaStar size={11} />
                    <span className="text-gray-700 dark:text-slate-300">{ratingVal}</span>
                  </div>
                  {product.category && (
                    <span className="text-[10px] text-gray-400 dark:text-slate-500 font-extrabold uppercase tracking-wider line-clamp-1">
                      {product.category?.name || product.category}
                    </span>
                  )}
                </div>

                <Link to={`/product/${product.slug || pId}`}>
                  <h3 className="text-sm font-extrabold text-gray-900 dark:text-white line-clamp-1 hover:text-orange-500 transition-colors">
                    {product.name}
                  </h3>
                </Link>

                <p className="mt-1 text-[11px] text-gray-500 dark:text-slate-400 line-clamp-2 min-h-[30px] leading-tight">
                  {product.description || "Freshly prepared high-quality item."}
                </p>
              </div>

              {/* Price & Swiggy-style Add Controller */}
              <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <div>
                  <p className="text-base font-black text-gray-900 dark:text-white leading-none">
                    ₹{displayPrice}
                  </p>
                  {originalPrice && (
                    <p className="text-[10px] text-gray-400 line-through mt-0.5">
                      ₹{originalPrice}
                    </p>
                  )}
                </div>

                {/* Swiggy-style Quantity Controller */}
                {!isAvailable ? (
                  <span className="text-[10px] font-bold text-red-500 bg-red-50 dark:bg-red-950/60 px-2 py-1 rounded-xl">
                    Out of Stock
                  </span>
                ) : cartQty > 0 ? (
                  <div className="flex items-center bg-orange-500 text-white rounded-xl font-black text-xs px-1 py-1 shadow-md shadow-orange-500/20">
                    <button
                      onClick={() => updateQuantity(pId, cartQty - 1)}
                      className="w-6 h-6 flex items-center justify-center hover:bg-orange-600 rounded-lg transition"
                    >
                      <FaMinus size={10} />
                    </button>
                    <span className="px-2 text-xs font-black">{cartQty}</span>
                    <button
                      onClick={() => updateQuantity(pId, cartQty + 1)}
                      className="w-6 h-6 flex items-center justify-center hover:bg-orange-600 rounded-lg transition"
                    >
                      <FaPlus size={10} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-900/50 hover:bg-orange-500 hover:text-white font-extrabold text-xs transition shadow-xs"
                  >
                    <FaPlus size={10} />
                    <span>ADD</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
