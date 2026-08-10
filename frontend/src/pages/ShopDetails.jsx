import { useParams } from "react";
import { useState, useEffect } from "react";
import useShop from "../hooks/useShop";
import { getShopReviews } from "../services/review.service";
import ShopHero from "../components/shop/ShopHero";
import ShopQuickActions from "../components/shop/ShopQuickActions";
import BusinessHours from "../components/shop/BusinessHours";
import ShopFacilities from "../components/shop/ShopFacilities";
import ShopOffers from "../components/shop/ShopOffers";
import ShopReviews from "../components/shop/ShopReviews";
import MenuSection from "../components/shop/MenuSection";
import ReviewModal from "../components/shop/ReviewModal";
import ShopMoments from "../components/shop/ShopMoments";
import RelatedShops from "../components/shop/RelatedShops";
import BottomCartBar from "../components/cart/BottomCartBar";
import { getShopProducts } from "../services/productService";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function ShopDetails() {
  const { slug } = useParams();

  const { shop, loading, error } = useShop(slug);
  const { authenticated } = useAuth();

  const [activeTab, setActiveTab] = useState("products");
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);

  useEffect(() => {
    if (shop?._id || shop?.id) {
      const shopId = shop._id || shop.id;
      fetchReviews(shopId);
      fetchProducts(shopId);
    }
  }, [shop]);

  const fetchProducts = async (id) => {
    try {
      const data = await getShopProducts(id);
      if (data) {
        setProducts(data);
      }
    } catch (err) {
      console.error("Failed to fetch shop products", err);
    }
  };

  const fetchReviews = async (id) => {
    try {
      const { data } = await getShopReviews(id);
      if (data?.data) {
        setReviews(data.data);
      }
    } catch (err) {
      console.error("Failed to fetch shop reviews", err);
    }
  };

  const handleWriteReview = () => {
    if (!authenticated) {
      toast.error("Please login to submit a review");
      return;
    }
    setIsReviewModalOpen(true);
  };

  const handleReviewSubmitted = (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
  };

  const scrollToSection = (tabId) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-3">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-black text-slate-500">Loading Storefront...</p>
      </div>
    );
  }

  if (error || !shop) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 space-y-4">
        <p className="text-5xl">🏬</p>
        <h2 className="text-2xl font-black text-slate-800 dark:text-white">Shop Not Found</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
          {error || "The requested storefront does not exist or may have been temporarily deactivated."}
        </p>
      </div>
    );
  }

  const navTabs = [
    { id: "products", label: "Menu & Products" },
    { id: "moments", label: "Moments & Video Feed" },
    { id: "reviews", label: `Reviews (${reviews.length})` },
    { id: "about", label: "Hours & Facilities" },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pb-24 transition-colors">
      {/* 1. Shop Hero Section */}
      <ShopHero shop={shop} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2. Quick Action Buttons */}
        <ShopQuickActions shop={shop} />

        {/* 3. Shop Offers / Promotions Banner */}
        <ShopOffers shop={shop} />

        {/* 4. Sticky Shop Navigation Bar */}
        <div className="sticky top-0 bg-white/95 dark:bg-slate-950/95 backdrop-blur z-30 border-b border-gray-100 dark:border-slate-800 my-4 py-2">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {navTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-black transition-all ${
                  activeTab === tab.id
                    ? "bg-gray-900 text-white dark:bg-white dark:text-slate-900 shadow-md"
                    : "text-gray-600 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-slate-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 5. Products / Menu Section */}
        <MenuSection products={products} />

        {/* 6. Mahii Moments Visual Section */}
        <ShopMoments shopId={shop._id || shop.id} />

        {/* 7. Shop Hours & Facilities (About) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10 border-t border-gray-100 dark:border-slate-800 pt-10" id="about">
          <BusinessHours shop={shop} />
          <ShopFacilities shop={shop} />
        </div>

        {/* 8. Customer Reviews */}
        <div id="reviews">
          <ShopReviews
            shop={shop}
            reviews={reviews}
            onWriteReview={handleWriteReview}
          />
        </div>

        {/* 9. Similar / Related Shops */}
        <RelatedShops
          currentShopId={shop._id || shop.id || shop.slug}
          category={shop.category?.name || shop.category}
        />
      </div>

      {/* 10. Review Submission Modal */}
      <ReviewModal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        shopId={shop._id || shop.id}
        onReviewSubmitted={handleReviewSubmitted}
      />

      {/* 11. Floating Sticky Bottom Cart Bar */}
      <BottomCartBar />
    </div>
  );
}
