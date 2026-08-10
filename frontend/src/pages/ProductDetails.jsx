import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useProduct from "../hooks/useProduct";
import useCart from "../hooks/useCart";

import ProductHero from "../components/product/ProductHero";
import ProductInfo from "../components/product/ProductInfo";
import ProductPurchaseCard from "../components/product/ProductPurchaseCard";
import ProductMoments from "../components/product/ProductMoments";

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart: addToCartContext } = useCart();

  const { product, loading, error } = useProduct(productId);
  const [quantity, setQuantity] = useState(1);

  const increase = () => {
    setQuantity((q) => q + 1);
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      await addToCartContext(product, quantity);
      toast.success(`${product.name} added to cart! 🛒`);
    } catch (err) {
      toast.error(err?.message || "Unable to add item to cart");
    }
  };

  const handleBuyNow = async () => {
    if (!product) return;
    try {
      await addToCartContext(product, quantity);
      navigate("/cart");
    } catch {
      toast.error("Unable to continue to cart.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-extrabold text-slate-500">Loading Product Details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 space-y-4">
        <p className="text-5xl">📦</p>
        <h2 className="text-2xl font-black text-slate-800 dark:text-white">Product Not Found</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md">
          {error || "The requested product does not exist or may have been archived by the shop."}
        </p>
        <button
          onClick={() => navigate("/explore")}
          className="bg-orange-500 text-white px-5 py-2.5 rounded-xl font-bold text-sm hover:bg-orange-600 transition"
        >
          Explore Other Products
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-slate-950 min-h-screen pb-20 transition-colors">
      <ProductHero product={product} />

      <ProductInfo product={product} />

      <ProductMoments productId={product._id || product.id} />

      <ProductPurchaseCard
        product={product}
        quantity={quantity}
        increase={increase}
        decrease={decrease}
        addToCart={handleAddToCart}
        buyNow={handleBuyNow}
      />
    </div>
  );
}
