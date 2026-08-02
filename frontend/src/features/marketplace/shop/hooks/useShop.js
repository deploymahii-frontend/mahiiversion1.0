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
      if (!shopData) {
        setShop(null);
        setProducts([]);
        setError("Shop not found.");
        return;
      }

      setShop(shopData);
      try {
        const productData = await getShopProducts(shopData._id);
        setProducts(productData || []);
      } catch (err) {
        setProducts([]);
      }
    } catch (err) {
      setShop(null);
      setProducts([]);
      setError(err?.message || "Unable to load shop details.");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (!slug) {
      setShop(null);
      setProducts([]);
      setLoading(false);
      return;
    }
    loadShop();
  }, [loadShop, slug]);

  return {
    shop,
    products,
    loading,
    error,
    refresh: loadShop,
  };
}
