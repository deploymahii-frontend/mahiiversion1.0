import { useEffect, useState } from "react";
import * as productService from "../services/product.service";

const MOCK_SHOP_PRODUCTS = [
  {
    _id: "prod-1",
    id: "prod-1",
    name: "Special Kolhapuri Kat Misal",
    price: 120,
    category: "Restaurants",
    stock: 45,
    inStock: true,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop",
  },
  {
    _id: "prod-2",
    id: "prod-2",
    name: "Solkadhi Bottle (500ml)",
    price: 100,
    category: "Beverages",
    stock: 20,
    inStock: true,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop",
  },
  {
    _id: "prod-3",
    id: "prod-3",
    name: "Extra Pav Pair (2 pcs)",
    price: 20,
    category: "Bakery",
    stock: 100,
    inStock: true,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop",
  },
];

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    try {
      setLoading(true);
      const res = await productService.getProducts();
      const list = res?.data?.data || res?.data;
      setProducts(Array.isArray(list) && list.length > 0 ? list : MOCK_SHOP_PRODUCTS);
    } catch {
      setProducts(MOCK_SHOP_PRODUCTS);
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
