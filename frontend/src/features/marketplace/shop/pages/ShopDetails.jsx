import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import useShop from "../hooks/useShop";
import ProductGrid from "../components/ProductGrid";
import ShopHero from "../components/ShopHero";
import ShopQuickActions from "../../../../components/shop/ShopQuickActions";
import ShopInfo from "../components/ShopInfo";
import ShopStats from "../components/ShopStats";
import ShopCategories from "../components/ShopCategories";
import BusinessHours from "../../../../components/shop/BusinessHours";
import ShopFacilities from "../../../../components/shop/ShopFacilities";
import ShopGallery from "../../../../components/shop/ShopGallery";
import ShopOffers from "../../../../components/shop/ShopOffers";
import ShopReviews from "../../../../components/shop/ShopReviews";
import ShopMoments from "../../../../components/shop/ShopMoments";
import ReviewModal from "../../../../components/shop/ReviewModal";
import ShopSkeleton from "../components/ShopSkeleton";
import ErrorState from "../../../../shared/ErrorState";
import RelatedShops from "../../../../modules/customer/components/RelatedShops";
import { getShopReviews } from "../../../../services/review.service";
import { useAuth } from "../../../../context/AuthContext";
import toast from "react-hot-toast";

export default function ShopDetails() {
  const { slug } = useParams();
  const { shop, products, loading, error, refresh } = useShop(slug);
  const { authenticated } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [addressCopied, setAddressCopied] = useState(false);

  const categories = useMemo(
    () => Array.from(new Set((products || []).map((product) => product.category).filter(Boolean))),
    [products]
  );

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    if (selectedCategory === "All") return products;
    return products.filter((product) => product.category === selectedCategory);
  }, [products, selectedCategory]);

  useEffect(() => {
    if (slug) {
      setSelectedCategory("All");
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

  const handleWriteReview = () => {
    if (!authenticated) {
      toast.error("Please login to write a review");
      return;
    }
    setIsReviewModalOpen(true);
  };

  const handleReviewSubmitted = (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  const addressLine = shop?.address?.line1
    ? `${shop.address.line1}${shop.address.city ? `, ${shop.address.city}` : ""}${shop.address.state ? `, ${shop.address.state}` : ""}${shop.address.pincode ? ` - ${shop.address.pincode}` : ""}`
    : "";

  const handleCopyAddress = async () => {
    if (!addressLine) return;
    await navigator.clipboard.writeText(addressLine);
    setAddressCopied(true);
    toast.success("Address copied to clipboard");
    window.setTimeout(() => setAddressCopied(false), 2000);
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
        <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
          <h2 className="text-2xl font-bold">Shop not found</h2>
          <p className="mt-3 text-gray-500">Try searching for another shop or return to explore.</p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-gray-50 min-h-screen pb-16">
      <Helmet>
        <title>{shop.name} | Mahii</title>
      </Helmet>

      <ShopHero shop={shop} />

      <div className="mx-auto max-w-7xl px-4 py-8 space-y-8 lg:px-6">
        <div className="grid gap-8 xl:grid-cols-[1.8fr_0.95fr]">
          <div className="space-y-8">
            <ShopInfo shop={shop} />
            <ShopStats shop={shop} />
            <ShopQuickActions shop={shop} />

            <div className="grid gap-6 xl:grid-cols-[1.4fr_0.95fr]">
              <div className="space-y-6">
                <div className="bg-white rounded-3xl shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-slate-900">About</h2>
                  <p className="mt-4 text-gray-600 leading-relaxed">
                    {shop.description || "No shop description available yet."}
                  </p>
                  {shop.tagline && (
                    <p className="mt-4 text-sm text-slate-500 italic">{shop.tagline}</p>
                  )}
                  {shop.speciality && (
                    <p className="mt-4 text-sm text-slate-500">Specialty: {shop.speciality}</p>
                  )}
                  {shop.languages && (
                    <p className="mt-3 text-sm text-slate-500">Languages: {shop.languages.join(", ")}</p>
                  )}
                </div>

                <BusinessHours shop={shop} />
                <ShopFacilities shop={shop} />
                <ShopOffers shop={shop} />

                <div className="bg-white rounded-3xl shadow-sm p-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">Products</h2>
                      <p className="text-sm text-slate-500 mt-1">
                        {products?.length ?? 0} item{products?.length === 1 ? "" : "s"} in menu
                      </p>
                    </div>
                    <div className="block sm:hidden">
                      <ShopCategories
                        categories={categories}
                        selected={selectedCategory}
                        onChange={setSelectedCategory}
                      />
                    </div>
                  </div>

                  <div className="mt-6 hidden sm:block">
                    <ShopCategories
                      categories={categories}
                      selected={selectedCategory}
                      onChange={setSelectedCategory}
                    />
                  </div>

                  <div className="mt-6">
                    {filteredProducts.length ? (
                      <ProductGrid products={filteredProducts} />
                    ) : (
                      <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-10 text-center text-slate-500">
                        No products available for this category.
                      </div>
                    )}
                  </div>
                </div>

                <ShopReviews
                  shop={shop}
                  reviews={reviews}
                  onWriteReview={handleWriteReview}
                />
                <ShopMoments shop={shop} />
                <ReviewModal
                  isOpen={isReviewModalOpen}
                  onClose={() => setIsReviewModalOpen(false)}
                  shopId={shop._id || shop.id}
                  onReviewSubmitted={handleReviewSubmitted}
                />
              </div>

              <aside className="space-y-6">
                <div className="bg-white rounded-3xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-slate-900">Business Information</h2>
                  <div className="mt-5 space-y-4 text-sm text-slate-600">
                    {addressLine && (
                      <div>
                        <p className="font-semibold text-slate-900">Address</p>
                        <p>{addressLine}</p>
                        <button
                          onClick={handleCopyAddress}
                          className="mt-3 inline-flex items-center rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700 hover:bg-slate-200"
                        >
                          {addressCopied ? "Copied" : "Copy Address"}
                        </button>
                      </div>
                    )}
                    {shop.phone && (
                      <div>
                        <p className="font-semibold text-slate-900">Contact</p>
                        <p>{shop.phone}</p>
                      </div>
                    )}
                    {shop.email && (
                      <div>
                        <p className="font-semibold text-slate-900">Email</p>
                        <p>{shop.email}</p>
                      </div>
                    )}
                    {shop.website && (
                      <div>
                        <p className="font-semibold text-slate-900">Website</p>
                        <p>{shop.website}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-slate-900">Policies</h2>
                  <div className="mt-5 space-y-4 text-sm text-slate-600">
                    <p>
                      Published shop policies are managed by Mahii. For detailed delivery, refund, and cancellation rules, read our platform policies.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="/terms"
                        className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                      >
                        Terms & Conditions
                      </a>
                      <a
                        href="/privacy"
                        className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200"
                      >
                        Privacy Policy
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm p-6">
                  <h2 className="text-xl font-bold text-slate-900">Similar Shops</h2>
                  <div className="mt-5">
                    <RelatedShops shops={shop.relatedShops || []} />
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
