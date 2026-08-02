import { useEffect, useState } from "react";
import shopAPI from "../api/shop.api";

export default function useShop(slug) {
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) {
      setShop(null);
      setError("Shop slug is missing.");
      setLoading(false);
      return;
    }

    const loadShop = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await shopAPI.getShop(slug);
        const fetched = response?.data?.data || response?.data;

        if (!fetched) {
          setShop(null);
          setError("Shop not found.");
        } else {
          setShop(fetched);
        }
      } catch (err) {
        setShop(null);
        setError(err?.message || "Unable to load shop details.");
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
