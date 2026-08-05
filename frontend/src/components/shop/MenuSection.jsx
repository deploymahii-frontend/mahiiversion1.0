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
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-10 text-center shadow-sm border border-gray-100 dark:border-slate-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Menu currently unavailable</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">This shop hasn't added any products yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-5 py-10" id="menu">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Full Menu</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Explore all items from this shop.</p>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide mb-6 sticky top-0 bg-gray-100 dark:bg-slate-900 z-10 py-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-sm border ${
              activeCategory === cat
                ? "bg-orange-500 text-white border-orange-500 shadow-orange-500/20"
                : "bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-300 border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700"
            }`}
          >
            {typeof cat === 'string' ? cat.charAt(0).toUpperCase() + cat.slice(1).replace(/_/g, ' ') : "Other"}
          </button>
        ))}
      </div>

      {/* Products List */}
      <div className="space-y-4">
        {filteredProducts.map((product) => (
          <div
            key={product._id || product.id}
            className={`bg-white dark:bg-slate-800 rounded-2xl p-4 flex gap-4 shadow-sm border border-gray-100 dark:border-slate-700 transition hover:shadow-md ${!product.available ? 'opacity-60 grayscale' : ''}`}
          >
            {/* Image */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-slate-700 relative">
              <img
                src={product?.image || product?.images?.[0] || "https://via.placeholder.com/300?text=No+Image"}
                alt={product?.name || "Product"}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = "https://via.placeholder.com/300?text=No+Image"; }}
              />
              {!product?.available && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white bg-black/40 px-2 py-1 rounded-full uppercase">Out of Stock</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col justify-between py-1">
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg leading-tight">
                    {product?.name || "Unnamed Product"}
                  </h3>
                  {/* Veg / Non-Veg Indicator */}
                  {product?.type === "veg" && (
                    <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-1.5 py-0.5 rounded border border-emerald-200 dark:border-emerald-800 shrink-0">
                      <FaLeaf size={10} /> Veg
                    </div>
                  )}
                  {product?.type === "non-veg" && (
                    <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-red-600 bg-red-50 dark:bg-red-900/30 px-1.5 py-0.5 rounded border border-red-200 dark:border-red-800 shrink-0">
                      <FaDrumstickBite size={10} /> Non-Veg
                    </div>
                  )}
                </div>
                
                <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-1.5">
                  ₹{product?.price || product?.basePrice || 0}
                  {product?.compareAtPrice && (
                    <span className="text-xs text-gray-400 line-through ml-2 font-normal">₹{product.compareAtPrice}</span>
                  )}
                </p>

                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2 leading-relaxed">
                  {product?.description || "No description provided."}
                </p>
              </div>

              <div className="flex items-center justify-end mt-3">
                <button 
                  disabled={!product.available}
                  className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 dark:disabled:bg-slate-700 text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <FaPlus size={10} /> Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
