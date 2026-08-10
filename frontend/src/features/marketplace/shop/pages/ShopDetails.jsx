import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useShop from "../hooks/useShop";
import ProductGrid from "../components/ProductGrid";
import ShopHero from "../components/ShopHero";
import ShopCategories from "../components/ShopCategories";
import ShopMoments from "../../../../components/shop/ShopMoments";
import ShopSkeleton from "../components/ShopSkeleton";
import ErrorState from "../../../../shared/ErrorState";
import { getShopReviews } from "../../../../services/review.service";
import { useAuth } from "../../../../context/AuthContext";
import { FiSearch, FiCheckCircle } from "react-icons/fi";
import toast from "react-hot-toast";

export default function ShopDetails() {
  const { slug } = useParams();
  const { shop, products, loading, error, refresh } = useShop(slug);
  const { authenticated } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [vegOnly, setVegOnly] = useState(false);

  const categories = useMemo(
    () => Array.from(new Set((products || []).map((product) => product.category).filter(Boolean))),
    [products]
  );

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((product) => {
      const matchCat = selectedCategory === "All" || product.category === selectedCategory;
      const matchSearch = !searchQuery.trim() || product.name.toLowerCase().includes(searchQuery.toLowerCase()) || (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
      const isVeg = product.isVeg !== false && !product.category?.toLowerCase?.().includes("meat") && !product.category?.toLowerCase?.().includes("chicken");
      const matchVeg = !vegOnly || isVeg;
      return matchCat && matchSearch && matchVeg;
    });
  }, [products, selectedCategory, searchQuery, vegOnly]);

  useEffect(() => {
    if (slug) {
      setSelectedCategory("All");
      setSearchQuery("");
      setVegOnly(false);
    }
  }, [slug]);

  useEffect(() => {
    if (shop?._id || shop?.id) {
      fetchReviews(shop._id || shop.id);
    }
  }, [shop]);

  const fetchReviews = async (id) => {
    try {
      const { data } = await getShopReviews(id);
      if (data?.data) {
        setReviews(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch reviews", err);
    }
  };

  if (loading) {
    return <ShopSkeleton />;
  }

  if (error) {
    return (
      <ErrorState
        title="Unable to load shop"
        message="Please try again in a moment."
        onRetry={refresh}
      />
    );
  }

  if (!shop) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950 p-6">
        <div className="rounded-3xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-10 text-center shadow-sm">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Shop not found</h2>
          <p className="mt-3 text-gray-500 dark:text-slate-400">Try searching for another shop or return to explore.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-gray-50 dark:bg-slate-950 min-h-screen pb-24">
      <Helmet>
        <title>{shop.name} | Mahii</title>
      </Helmet>

      <ShopHero shop={shop} />

      <div className="mx-auto max-w-7xl px-4 py-8 space-y-8 lg:px-6">
        <div className="grid gap-8">
          <div className="space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6">
              {/* Menu & Controls Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">Menu & Items</h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Showing {filteredProducts.length} of {products?.length ?? 0} items
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  {/* Search Input */}
                  <div className="relative flex-1 sm:w-64">
                    <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="text"
                      placeholder="Search dish or item..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 dark:text-white"
                    />
                  </div>

                  {/* Veg Only Toggle */}
                  <button
                    onClick={() => setVegOnly(!vegOnly)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold border transition ${
                      vegOnly
                        ? "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-700 dark:text-emerald-400"
                        : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300"
                    }`}
                  >
                    <div className="w-3.5 h-3.5 border-2 border-emerald-600 flex items-center justify-center rounded-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    </div>
                    <span>Veg Only</span>
                    {vegOnly && <FiCheckCircle size={14} className="text-emerald-600" />}
                  </button>
                </div>
              </div>

              {/* Categories Pills */}
              <div className="py-4">
                <ShopCategories
                  categories={categories}
                  selected={selectedCategory}
                  onChange={setSelectedCategory}
                />
              </div>

              {/* Product Grid */}
              <div className="mt-4">
                {filteredProducts.length ? (
                  <ProductGrid products={filteredProducts} />
                ) : (
                  <div className="rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 p-12 text-center text-slate-500 dark:text-slate-400">
                    <p className="font-bold text-lg text-slate-700 dark:text-slate-300">No items match your criteria</p>
                    <p className="text-xs mt-1">Try clearing search or filters to explore the full menu.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Shop Moments Section */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 p-6">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-6">Moments & Highlights</h2>
              <ShopMoments shopId={shop._id || shop.id} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
