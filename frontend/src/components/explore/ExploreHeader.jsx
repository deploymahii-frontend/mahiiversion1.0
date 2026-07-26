export default function ExploreHeader({ search, setSearch, sort, setSort }) {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold">Explore</h1>
        <p className="text-gray-500 mt-1">Find the best nearby shops and stores</p>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search shops, categories or items"
        className="w-full rounded-2xl border border-gray-200 px-4 py-3"
      />

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="w-full rounded-2xl border border-gray-200 px-4 py-3"
      >
        <option value="nearby">Nearby</option>
        <option value="rating">Top Rated</option>
        <option value="popular">Popular</option>
      </select>
    </div>
  );
}
