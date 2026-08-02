import { Link } from "react-router-dom";
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

      <div className="rounded-3xl border border-dashed border-slate-200 bg-white/80 dark:bg-slate-900/80 p-8 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Trending shops will appear here once live traffic data is available.
        </p>
        <Link to="/explore" className="inline-flex items-center gap-2 mt-4 text-orange-500 font-semibold hover:text-orange-600 transition">
          Browse all shops
          <FiChevronRight />
        </Link>
      </div>
    </section>
  );
}
