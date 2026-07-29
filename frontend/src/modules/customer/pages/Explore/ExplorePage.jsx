import SearchHeader from "./components/SearchHeader";
import SearchSuggestions from "./components/SearchSuggestions";
import FilterBar from "./components/FilterBar";
import CategoryTabs from "./components/CategoryTabs";
import SearchResults from "./components/SearchResults";
import FloatingMapButton from "./components/FloatingMapButton";
import { useExplore } from "./hooks/useExplore";

export default function ExplorePage() {
  const { loading, query, setQuery, filters, setFilters, results, suggestions } = useExplore();

  return (
    <main className="min-h-screen bg-gray-50">
      <SearchHeader query={query} setQuery={setQuery} />
      <SearchSuggestions query={query} suggestions={suggestions} />
      <FilterBar filters={filters} setFilters={setFilters} />
      <CategoryTabs />
      <SearchResults loading={loading} results={results} />
      <FloatingMapButton />
    </main>
  );
}
