import CustomerLayout from "@/layouts/CustomerLayout";

import BusinessHero from "./components/BusinessHero";
import BusinessInfo from "./components/BusinessInfo";
import BusinessActions from "./components/BusinessActions";
import ProductSection from "./components/ProductSection";
import ServiceSection from "./components/ServiceSection";
import OfferSection from "./components/OfferSection";
import MomentsSection from "./components/MomentsSection";
import ReviewSection from "./components/ReviewSection";
import GallerySection from "./components/GallerySection";
import LocationSection from "./components/LocationSection";
import SimilarBusinesses from "./components/SimilarBusinesses";

export default function BusinessDetails() {
  return (
    <CustomerLayout>

      <BusinessHero />

      <BusinessInfo />

      <BusinessActions />

      <ProductSection />

      <ServiceSection />

      <OfferSection />

      <MomentsSection />

      <ReviewSection />

      <GallerySection />

      <LocationSection />

      <SimilarBusinesses />

    </CustomerLayout>
  );
}
