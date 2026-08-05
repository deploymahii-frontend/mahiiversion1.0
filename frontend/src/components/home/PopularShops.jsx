import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaStar, FaChevronRight } from "react-icons/fa";
import * as shopService from "../../services/shopService";
import { mapShops } from "../../utils/shopAdapter";

export default function PopularShops() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadShops() {
      try {
        const data = await shopService.getShops({ limit: 4, sort: "RATING" });
        setShops(mapShops(data || []));
      } catch (err) {
        console.error("Failed to load popular shops", err);
      } finally {
        setLoading(false);
      }
    }
    loadShops();
  }, []);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-5 py-10">
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 w-32 bg-gray-200 dark:bg-slate-700 animate-pulse rounded"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-64 rounded-2xl bg-gray-100 dark:bg-slate-800 animate-pulse"></div>
          ))}
        </div>
      </section>
    );
  }

  if (shops.length === 0) {
    return null; // Don't show the section if no shops are live yet
  }

  return (
    <section className="max-w-7xl mx-auto px-5 py-10">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Popular Shops</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Discover top-rated places near you.</p>
        </div>
        <Link to="/explore" className="text-sm font-semibold text-orange-500 hover:text-orange-600 flex items-center gap-1 group transition">
          View All <FaChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {shops.map((shop) => (
          <Link
            key={shop.id}
            to={`/shop/${shop.slug}`}
            className="group block bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 dark:border-slate-700 overflow-hidden"
          >
            <div className="relative h-40 w-full bg-gradient-to-br from-orange-50 to-orange-100 dark:from-slate-700 dark:to-slate-800 overflow-hidden flex items-center justify-center p-4 text-center">
              <h2 className="text-xl md:text-2xl font-black text-orange-800 dark:text-orange-200 uppercase tracking-widest opacity-90 group-hover:scale-105 transition-transform duration-500 line-clamp-2">
                {shop.name}
              </h2>
              {!shop.open && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-[1px]">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-white text-xs font-bold tracking-widest uppercase">
                    Closed
                  </span>
                </div>
              )}
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900 dark:text-white truncate pr-2 group-hover:text-orange-500 transition-colors">
                  {shop.name}
                </h3>
                {shop.rating > 0 && (
                  <div className="flex items-center gap-1 shrink-0 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-1.5 py-0.5 rounded text-xs font-bold">
                    <FaStar size={10} /> {shop.rating.toFixed(1)}
                  </div>
                )}
              </div>
              <p className="text-xs font-medium text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                {shop.category.charAt(0).toUpperCase() + shop.category.slice(1).replace(/_/g, ' ')}
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-slate-500 font-medium">
                <span>{shop.address || "Local"}</span>
                <span>•</span>
                <span>{shop.price !== "—" ? shop.price + " min" : "Delivery"}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
