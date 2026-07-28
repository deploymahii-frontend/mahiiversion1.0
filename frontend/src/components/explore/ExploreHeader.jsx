export default function ExploreHeader({ sort, setSort }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Explore Mahii</h1>
        <p className="text-gray-500 dark:text-slate-400 mt-1 text-sm">
          Discover trusted local shops, restaurants, bakeries, and daily services near you
        </p>
      </div>

      <div className="flex items-center gap-2 sm:w-56">
        <label htmlFor="sort-select" className="text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap">
          Sort By:
        </label>
        <select
          id="sort-select"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-200 px-3 py-2 text-sm font-medium focus:ring-2 focus:ring-orange-500 outline-none"
        >
          <option value="POPULAR">Popular</option>
          <option value="RATING">Top Rated</option>
        </select>
      </div>
    </div>
  );
}
