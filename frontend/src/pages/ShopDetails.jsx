import { useParams } from "react-router-dom";
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
import { getShopProducts } from "../services/productService";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function ShopDetails() {
  const { slug } = useParams();

  const { shop, loading, error } = useShop(slug);
  const { authenticated } = useAuth();
  
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
      console.error("Failed to fetch products", err);
    }
  };

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

  if (loading) {
    return <div className="p-10 text-center dark:text-slate-200">Loading shop...</div>;
  }

  if (error) {
    return <div className="p-10 text-center text-red-500">{error}</div>;
  }

  if (!shop) {
    return <div className="p-10 text-center dark:text-slate-200">Shop not found.</div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 pb-20">
      <div className="max-w-4xl mx-auto">
        <ShopHero shop={shop} />
        
        <div className="px-4 sm:px-6 lg:px-8">
          <ShopQuickActions shop={shop} />
          
          <ShopOffers shop={shop} />
          
          <MenuSection products={products} />
          
          <ShopMoments shopId={shop._id || shop.id} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-10 border-t border-dashed border-gray-200 dark:border-slate-800 pt-10">
            <BusinessHours shop={shop} />
            <ShopFacilities shop={shop} />
          </div>
          
          <ShopReviews 
            shop={shop} 
            reviews={reviews} 
            onWriteReview={handleWriteReview} 
          />
        </div>
      </div>
      
      <ReviewModal 
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        shopId={shop._id || shop.id}
        onReviewSubmitted={handleReviewSubmitted}
      />
    </div>
  );
}
