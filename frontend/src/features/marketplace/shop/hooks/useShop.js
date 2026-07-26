import { useEffect, useState, useCallback } from "react";
import {
  getShopBySlug,
  getShopProducts,
} from "../services/shopService";

export default function useShop(slug) {
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const loadShop = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const shopData = await getShopBySlug(slug);

      setShop(shopData);

      const productData =
        await getShopProducts(shopData._id);

      setProducts(productData);
    } catch (err) {
      console.error(err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    loadShop();
  }, [loadShop]);

  return {
    shop,
    products,
    loading,
    error,
    refresh: loadShop,
  };
}

