import { useState, useMemo } from "react";
import { FaPlus, FaMinus, FaLeaf, FaDrumstickBite } from "react-icons/fa";

export default function MenuSection({ products = [] }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const safeProducts = Array.isArray(products) ? products : [];

  // Group products by category
  const categories = useMemo(() => {
    const cats = new Set(safeProducts.map((p) => p?.category?.name || p?.category || "Other"));
    return ["All", ...Array.from(cats)];
  }, [safeProducts]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return safeProducts;
    return safeProducts.filter(
      (p) => (p?.category?.name || p?.category || "Other") === activeCategory
    );
  }, [safeProducts, activeCategory]);

  if (!safeProducts || safeProducts.length === 0) {
    return (
      <section className="max-w-4xl mx-auto px-5 py-10">
        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-3xl p-12 text-center border border-dashed border-slate-200 dark:border-slate-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Menu currently unavailable</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">This shop hasn't added any items to their menu yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-5 py-10" id="menu">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Menu</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Explore all delicious offerings.</p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide mb-6 sticky top-0 bg-gray-100/95 backdrop-blur-sm dark:bg-slate-900/95 z-10 py-3">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm ${
              activeCategory === cat
                ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 dark:bg-slate-800 dark:text-gray-300 dark:border-slate-700 dark:hover:bg-slate-700"
            }`}
          >
            {typeof cat === 'string' ? cat.charAt(0).toUpperCase() + cat.slice(1).replace(/_/g, ' ') : "Other"}
          </button>
        ))}
      </div>

      {/* Products List (Image-less, Modern UI) */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
        {filteredProducts.map((product, index) => (
          <div
            key={product._id || product.id}
            className={`p-6 flex justify-between gap-6 transition ${
              index !== filteredProducts.length - 1 ? 'border-b border-gray-100 dark:border-slate-700' : ''
            } ${!product.available ? 'opacity-50' : 'hover:bg-slate-50 dark:hover:bg-slate-800/80'}`}
          >
            {/* Left Content */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                {/* Veg / Non-Veg Indicator */}
                {product?.type === "veg" && (
                  <div className="flex items-center justify-center w-4 h-4 border-2 border-emerald-500 rounded-sm">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  </div>
                )}
                {product?.type === "non-veg" && (
                  <div className="flex items-center justify-center w-4 h-4 border-2 border-red-500 rounded-sm">
                     <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                  </div>
                )}
                
                {/* Bestseller Tag (Optional Example logic) */}
                {product?.rating >= 4.5 && (
                  <span className="text-[10px] font-extrabold text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded-sm tracking-wide">
                    BESTSELLER
                  </span>
                )}
              </div>
              
              <h3 className="font-bold text-gray-900 dark:text-white text-lg">
                {product?.name || "Unnamed Item"}
              </h3>
              
              <div className="flex items-center gap-2 mt-1">
                <span className="text-base font-semibold text-gray-900 dark:text-gray-100">
                  ₹{product?.price || product?.basePrice || 0}
                </span>
                {product?.compareAtPrice && (
                  <span className="text-xs text-gray-400 line-through font-medium">₹{product.compareAtPrice}</span>
                )}
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-3 line-clamp-2 leading-relaxed max-w-xl">
                {product?.description || "A delicious treat prepared with the finest ingredients."}
              </p>
            </div>

            {/* Right Action */}
            <div className="flex flex-col items-center justify-center shrink-0 w-28 relative">
               {!product.available && (
                 <span className="absolute -top-6 text-[10px] font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded uppercase tracking-wider">Out of stock</span>
               )}
               <button 
                  disabled={!product.available}
                  className="w-full bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 text-orange-600 dark:text-orange-400 hover:bg-orange-50 hover:border-orange-200 dark:hover:bg-slate-600 px-6 py-2 rounded-xl text-sm font-extrabold shadow-sm transition-all flex items-center justify-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ADD <FaPlus size={10} className="mt-0.5" />
                </button>
                <p className="text-[10px] text-gray-400 mt-2 font-medium">Customisable</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

