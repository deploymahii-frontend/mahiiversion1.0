import { useEffect, useState } from "react";
import { getProduct } from "../services/productService";

export default function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    async function load() {
      try {
        setLoading(true);
        const data = await getProduct(id);
        setProduct(data);
      } catch {
        setError("Unable to load product.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  return {
    product,
    loading,
    error,
  };
}
