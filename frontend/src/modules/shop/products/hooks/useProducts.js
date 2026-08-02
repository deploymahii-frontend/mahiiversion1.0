import { useEffect, useState } from "react";
import * as productService from "../services/product.service";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    try {
      setLoading(true);
      const res = await productService.getProducts();
      const list = res?.data?.data || res?.data;
      setProducts(Array.isArray(list) && list.length > 0 ? list : []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return {
    products,
    loading,
    refresh: loadProducts,
  };
}
