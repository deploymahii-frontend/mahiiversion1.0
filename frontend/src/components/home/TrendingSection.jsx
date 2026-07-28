import { Link } from "react-router-dom";
import ShopCard from "./ShopCard";
import { trendingShops } from "../../data/mockData";
import { FiTrendingUp, FiChevronRight } from "react-icons/fi";

export default function TrendingSection() {
  return (
    <section className="max-w-7xl mx-auto px-5 mt-12">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold text-gray-900 dark:text-white">
            <FiTrendingUp className="text-orange-500" />
            Trending Nearby
          </h2>

          <p className="text-gray-500 dark:text-slate-400 text-sm mt-1">
            Popular places people are visiting today.
          </p>
        </div>

        <Link to="/explore" className="flex items-center gap-1 text-orange-500 font-semibold hover:text-orange-600 transition">
          See All
          <FiChevronRight />
        </Link>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {trendingShops.map((shop) => (
          <ShopCard key={shop.id} shop={shop} />
        ))}
      </div>
    </section>
  );
}
