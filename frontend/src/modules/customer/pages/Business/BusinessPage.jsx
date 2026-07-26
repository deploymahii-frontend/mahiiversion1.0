import CustomerLayout from "@/layouts/CustomerLayout";
import BusinessHero from "./components/BusinessHero";
import BusinessInfo from "./components/BusinessInfo";
import BusinessTabs from "./components/BusinessTabs";
import ProductSection from "./components/ProductSection";
import ServiceSection from "./components/ServiceSection";
import OfferSection from "./components/OfferSection";
import MomentSection from "./components/MomentSection";
import GallerySection from "./components/GallerySection";
import ReviewSection from "./components/ReviewSection";
import LocationSection from "./components/LocationSection";
import ContactSection from "./components/ContactSection";
import BusinessActions from "./components/BusinessActions";
import RelatedBusinesses from "./components/RelatedBusinesses";

export default function BusinessPage() {
  return (
    <CustomerLayout>
      <div className="space-y-6">
        <BusinessHero />
        <BusinessInfo />
        <BusinessActions />
        <BusinessTabs />
        <ProductSection />
        <ServiceSection />
        <OfferSection />
        <MomentSection />
        <GallerySection />
        <ReviewSection />
        <LocationSection />
        <ContactSection />
        <RelatedBusinesses />
      </div>
    </CustomerLayout>
  );
}
