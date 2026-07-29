import BusinessCover from "./components/BusinessCover";
import BusinessHeader from "./components/BusinessHeader";
import BusinessTabs from "./components/BusinessTabs";
import BusinessOffers from "./components/BusinessOffers";
import ProductSection from "./components/ProductSection";
import ServiceSection from "./components/ServiceSection";
import ReviewSection from "./components/ReviewSection";
import MomentsSection from "./components/MomentsSection";
import RelatedBusinesses from "./components/RelatedBusinesses";

import { useBusinessProfile } from "./hooks/useBusinessProfile";

export default function BusinessProfilePage({ slug }) {
  const { data, isLoading } = useBusinessProfile(slug);

  if (isLoading) return <div>Loading...</div>;

  const { business, products, services, reviews, offers, moments, related } = data || {};

  return (
    <main className="min-h-screen bg-gray-50">
      <BusinessCover business={business} />
      <BusinessHeader business={business} />
      <BusinessTabs />
      <BusinessOffers offers={offers} />
      <ProductSection products={products} />
      <ServiceSection services={services} />
      <MomentsSection moments={moments} />
      <ReviewSection reviews={reviews} />
      <RelatedBusinesses businesses={related} />
    </main>
  );
}
