import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useShop from "../hooks/useShop";
import { getShopReviews } from "../services/review.service";
import ShopHero from "../components/shop/ShopHero";
import ShopQuickActions from "../components/shop/ShopQuickActions";
import BusinessHours from "../components/shop/BusinessHours";
import ShopFacilities from "../components/shop/ShopFacilities";
import ShopGallery from "../components/shop/ShopGallery";
import ShopOffers from "../components/shop/ShopOffers";
import ShopReviews from "../components/shop/ShopReviews";
import ShopMoments from "../components/shop/ShopMoments";
import MenuSection from "../components/shop/MenuSection";
import ReviewModal from "../components/shop/ReviewModal";
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
    <div className="min-h-screen bg-gray-100">
      <ShopHero shop={shop} />
      <ShopQuickActions shop={shop} />
      <BusinessHours shop={shop} />
      <ShopFacilities shop={shop} />
      <MenuSection products={products} />
      <ShopGallery shop={shop} />
      <ShopOffers shop={shop} />
      <ShopMoments shop={shop} />
      <ShopReviews 
        shop={shop} 
        reviews={reviews} 
        onWriteReview={handleWriteReview} 
      />
      <ReviewModal 
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        shopId={shop._id || shop.id}
        onReviewSubmitted={handleReviewSubmitted}
      />
    </div>
  );
}
