import useExplore from "../hooks/useExplore";
import ExploreHeader from "../components/explore/ExploreHeader";
import SearchBar from "../components/explore/SearchBar";
import FilterBar from "../components/explore/FilterBar";
import ShopGrid from "../components/explore/ShopGrid";
import LoadingGrid from "../components/explore/LoadingGrid";
import EmptyState from "../components/explore/EmptyState";

export default function Explore() {
  const {
    shops,
    loading,
    search,
    setSearch,
    category,
    setCategory,
    sort,
    setSort,
    categories,
  } = useExplore();

  return (
    <div className="max-w-7xl mx-auto py-10 px-5 space-y-8">
      <ExploreHeader search={search} setSearch={setSearch} sort={sort} setSort={setSort} />

      <SearchBar value={search} onChange={setSearch} />

      <FilterBar categories={categories} category={category} setCategory={setCategory} />

      {loading ? (
        <LoadingGrid />
      ) : shops.length ? (
        <ShopGrid shops={shops} />
      ) : (
        <EmptyState />
      )}
    </div>
  );
}
