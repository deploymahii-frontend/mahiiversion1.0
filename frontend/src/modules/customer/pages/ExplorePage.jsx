import { useSearchParams } from "react-router-dom";
import { useExplore } from "../hooks/useExplore";
import SearchBar from "../components/explore/SearchBar";
import SortDropdown from "../components/explore/SortDropdown";
import ActiveFilters from "../components/explore/ActiveFilters";
import ShopGrid from "../components/explore/ShopGrid";
import EmptyState from "../components/explore/EmptyState";
import PaginationLoader from "../components/explore/PaginationLoader";

export default function ExplorePage() {
    const [searchParams] = useSearchParams();
    const initialCategory = searchParams.get("category") || "";
    const initialSearch = searchParams.get("search") || "";

    const {
        shops,
        loading,
        hasMore,
        filters,
        updateFilter,
        clearFilters,
        loadMore,
    } = useExplore({
        category: initialCategory,
        search: initialSearch,
    });

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header & Search */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                            Explore Nearby Shops
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Discover top-rated restaurants, cafés, and local services
                        </p>
                    </div>
                </div>

                {/* Controls Bar */}
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="w-full md:w-1/2">
                        <SearchBar
                            value={filters.search}
                            onChange={(val) => updateFilter("search", val)}
                        />
                    </div>
                    <div className="flex items-center justify-between w-full md:w-auto gap-4">
                        <SortDropdown
                            value={filters.sort}
                            onChange={(val) => updateFilter("sort", val)}
                        />
                    </div>
                </div>

                {/* Active Filters */}
                <ActiveFilters
                    filters={filters}
                    onRemove={(key) => updateFilter(key, "")}
                    onClearAll={clearFilters}
                />

                {/* Shop Grid */}
                {loading && shops.length === 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="h-72 bg-white rounded-2xl animate-pulse p-4 border border-gray-100 flex flex-col justify-between">
                                <div className="h-40 bg-gray-200 rounded-xl mb-3"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                ) : shops.length === 0 ? (
                    <EmptyState onClear={clearFilters} />
                ) : (
                    <>
                        <ShopGrid shops={shops} />
                        {loading && <PaginationLoader />}
                    </>
                )}
            </div>
        </div>
    );
}
