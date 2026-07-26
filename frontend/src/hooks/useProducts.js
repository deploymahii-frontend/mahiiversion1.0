import { useEffect, useState } from "react";
import productAPI from "../api/product.api";

export default function useProducts(shopId) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, [shopId]);

  async function loadProducts(params = {}) {
    try {
      setLoading(true);
      const res = shopId
        ? await productAPI.getShopProducts(shopId)
        : await productAPI.getProducts(params);

      setProducts(res.data?.data || res.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function createProduct(data) {
    const res = await productAPI.createProduct(data);
    await loadProducts();
    return res;
  }

  async function updateProduct(id, data) {
    const res = await productAPI.updateProduct(id, data);
    await loadProducts();
    return res;
  }

  async function deleteProduct(id) {
    const res = await productAPI.deleteProduct(id);
    await loadProducts();
    return res;
  }

  return {
    products,
    loading,
    reload: loadProducts,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}
