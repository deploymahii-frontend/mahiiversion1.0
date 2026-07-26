import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import useProduct from "../hooks/useProduct";
import { addToCart as addCartItem } from "../services/cartService";

import ProductHero from "../components/product/ProductHero";
import ProductInfo from "../components/product/ProductInfo";
import ProductPurchaseCard from "../components/product/ProductPurchaseCard";

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const {
    product,
    loading,
    error,
  } = useProduct(productId);

  const [quantity, setQuantity] = useState(1);

  const increase = () => {
    setQuantity(q => q + 1);
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1);
    }
  };

  const addToCart = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await addCartItem(product._id, quantity);
      toast.success("Added to cart");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Unable to add to cart."
      );
    }
  };

  const buyNow = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    try {
      await addCartItem(product._id, quantity);
      navigate("/cart");
    } catch {
      toast.error("Unable to continue.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading Product...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <ProductHero product={product} />

      <ProductInfo product={product} />

      <ProductPurchaseCard
        product={product}
        quantity={quantity}
        increase={increase}
        decrease={decrease}
        addToCart={addToCart}
        buyNow={buyNow}
      />
    </div>
  );
}
