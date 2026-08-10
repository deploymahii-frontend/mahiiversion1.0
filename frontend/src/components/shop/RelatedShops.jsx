import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiStar, FiStore, FiArrowRight } from "react-icons/fi";
import { getShops } from "../../services/shopService";

export default function RelatedShops({ currentShopId, category }) {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadShops() {
      try {
        setLoading(true);
        const res = await getShops({ category, limit: 4 });
        const filtered = (res.data || res || []).filter(
          (s) => (s._id || s.id || s.slug) !== currentShopId
        );
        setShops(filtered.slice(0, 3));
      } catch {
        // Silently catch errors if API fails
      } finally {
        setLoading(false);
      }
    }

    loadShops();
  }, [currentShopId, category]);

  if (!loading && shops.length === 0) return null;

  return (
    <section className="my-12 border-t border-gray-100 dark:border-slate-800 pt-10" id="related">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white tracking-tight">
            Explore Similar Shops 🏬
          </h3>
          <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
            Discover other verified partners in {category || "your local area"}
          </p>
        </div>
        <Link
          to="/explore"
          className="text-xs font-bold text-orange-600 dark:text-orange-400 hover:underline flex items-center gap-1"
        >
          <span>View All</span>
          <FiArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {shops.map((s) => {
          const ratingVal = typeof s.rating === "number" ? s.rating.toFixed(1) : (s.rating?.average ? s.rating.average.toFixed(1) : "4.5");
          return (
            <Link
              key={s._id || s.id || s.slug}
              to={`/shop/${s.slug || s._id || s.id}`}
              className="group border border-gray-100 dark:border-slate-800 rounded-3xl p-4 bg-white dark:bg-slate-900 shadow-xs hover:shadow-md transition space-y-3"
            >
              <div className="relative h-32 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={
                    s.coverImage ||
                    s.logo ||
                    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
                  }
                  alt={s.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 right-2 bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                  <FiStar size={10} className="fill-current" />
                  {ratingVal}
                </span>
              </div>

              <div>
                <h4 className="font-extrabold text-sm text-gray-900 dark:text-white line-clamp-1 group-hover:text-orange-500 transition-colors">
                  {s.name}
                </h4>
                <p className="text-xs text-gray-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                  {s.category?.name || s.category || "Local Store"} • {s.address?.area || s.address?.city || "Nearby"}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
