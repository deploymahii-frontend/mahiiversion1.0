import CustomerLayout from "@/layouts/CustomerLayout";
import ProductGallery from "./components/ProductGallery";
import ProductInfo from "./components/ProductInfo";
import PriceCard from "./components/PriceCard";
import VariantSelector from "./components/VariantSelector";
import QuantitySelector from "./components/QuantitySelector";
import ProductActions from "./components/ProductActions";
import SpecificationSection from "./components/SpecificationSection";
import ReviewSection from "./components/ReviewSection";
import RelatedProducts from "./components/RelatedProducts";
import SellerCard from "./components/SellerCard";
import DeliverySection from "./components/DeliverySection";

export default function ProductPage() {
  return (
    <CustomerLayout>
      <div className="space-y-6">
        <ProductGallery />
        <ProductInfo />
        <PriceCard />
        <VariantSelector />
        <QuantitySelector />
        <ProductActions />
        <SpecificationSection />
        <ReviewSection />
        <RelatedProducts />
        <SellerCard />
        <DeliverySection />
      </div>
    </CustomerLayout>
  );
}
