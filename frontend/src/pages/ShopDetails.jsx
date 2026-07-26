import { useParams } from "react-router-dom";
import useShop from "../hooks/useShop";
import ShopHero from "../components/shop/ShopHero";
import ShopQuickActions from "../components/shop/ShopQuickActions";
import BusinessHours from "../components/shop/BusinessHours";
import ShopFacilities from "../components/shop/ShopFacilities";
import ShopGallery from "../components/shop/ShopGallery";
import ShopOffers from "../components/shop/ShopOffers";
import ShopReviews from "../components/shop/ShopReviews";
import ShopMoments from "../components/shop/ShopMoments";

export default function ShopDetails() {
  const { slug } = useParams();

  const { shop, loading, error } = useShop(slug);

  if (loading) {
    return <div className="p-10">Loading shop...</div>;
  }

  if (error) {
    return <div className="p-10 text-red-500">{error}</div>;
  }

  if (!shop) {
    return <div className="p-10">Shop not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <ShopHero shop={shop} />
      <ShopQuickActions shop={shop} />
      <BusinessHours shop={shop} />
      <ShopFacilities shop={shop} />
      <ShopGallery shop={shop} />
      <ShopOffers shop={shop} />
      <ShopMoments shop={shop} />
      <ShopReviews shop={shop} reviews={[]} />
    </div>
  );
}
