import React from "react";
import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";
import ProductPricing from "../components/ProductPricing";
import ProductActions from "../components/ProductActions";
import ProductDetails from "../components/ProductDetails";
import RelatedProducts from "../components/RelatedProducts";

const ProductPage = () => {
  return (
    <main>
      <ProductGallery />
      <ProductInfo />
      <ProductPricing />
      <ProductActions />
      <ProductDetails />
      <RelatedProducts />
    </main>
  );
};

export default ProductPage;
