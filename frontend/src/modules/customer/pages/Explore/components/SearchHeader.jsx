import SearchBar from "@/components/common/SearchBar";

export default function SearchHeader({ query, setQuery }) {
  return (
    <section className="sticky top-16 z-40 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl p-4">
        <SearchBar value={query} onChange={setQuery} placeholder="Search products, businesses..." />
      </div>
    </section>
  );
}
