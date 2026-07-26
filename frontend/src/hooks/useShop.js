import { useEffect, useState } from "react";
import shopAPI from "../api/shop.api";

export default function useShop(slug) {
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;

    const loadShop = async () => {
      try {
        setLoading(true);

        const response = await shopAPI.getShop(slug);

        setShop(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Unable to load shop.");
      } finally {
        setLoading(false);
      }
    };

    loadShop();
  }, [slug]);

  return {
    shop,
    loading,
    error,
  };
}
