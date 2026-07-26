import { useEffect, useState } from "react";
import { getShopProducts } from "../services/productService";

export default function useRelatedProducts(shopId, currentProductId) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!shopId) return;

    async function load() {
      try {
        const data = await getShopProducts(shopId);

        setProducts(
          data.filter((item) => item._id !== currentProductId)
        );
      } catch {
        setProducts([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [shopId, currentProductId]);

  return {
    products,
    loading,
  };
}
