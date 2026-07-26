import ShopCard from "./ShopCard";
import { trendingShops } from "../../data/mockData";
import { FiTrendingUp, FiChevronRight } from "react-icons/fi";

export default function TrendingSection() {
  return (
    <section className="max-w-7xl mx-auto px-5 mt-12">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="flex items-center gap-2 text-2xl font-bold">
            <FiTrendingUp className="text-orange-500" />
            Trending Nearby
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Popular places people are visiting today.
          </p>
        </div>

        <button className="flex items-center gap-1 text-orange-500 font-semibold">
          See All
          <FiChevronRight />
        </button>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {trendingShops.map((shop) => (
          <ShopCard key={shop.id} shop={shop} />
        ))}
      </div>
    </section>
  );
}
