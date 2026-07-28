import { useEffect, useState, useCallback } from "react";
import {
  getShopBySlug,
  getShopProducts,
} from "../services/shopService";

const DEMO_SHOPS = {
  "kolhapur-misal-house": {
    _id: "mock-1",
    id: "mock-1",
    name: "Kolhapur Misal House",
    slug: "kolhapur-misal-house",
    description: "Famous for authentic, mouth-watering Kolhapuri Kat Misal made using traditional family spices.",
    category: "Restaurants",
    rating: 4.8,
  },
  "shree-krishna-organic-mart": {
    _id: "mock-2",
    id: "mock-2",
    name: "Shree Krishna Organic Mart",
    slug: "shree-krishna-organic-mart",
    description: "Certified organic vegetables, unpolished pulses, cold-pressed oils, and natural grocery items.",
    category: "Grocery",
    rating: 4.6,
  },
  "mahalaxmi-sweets-bakers": {
    _id: "mock-3",
    id: "mock-3",
    name: "Mahalaxmi Sweets & Bakers",
    slug: "mahalaxmi-sweets-bakers",
    description: "Hot Jalebis, Dhokla, traditional pedas, and daily oven-fresh baked goods.",
    category: "Bakery",
    rating: 4.9,
  },
  "royal-fresh-dairy": {
    _id: "mock-4",
    id: "mock-4",
    name: "Royal Fresh Dairy & Desserts",
    slug: "royal-fresh-dairy",
    description: "Pure Cow Milk, fresh Paneer, Shrikhand, and artisanal dairy ice creams.",
    category: "Dairy",
    rating: 4.7,
  },
};

const DEMO_PRODUCTS = [
  {
    _id: "p-1",
    id: "p-1",
    name: "Special Kolhapuri Kat Misal",
    price: 120,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop",
    category: "Food",
    inStock: true,
  },
  {
    _id: "p-2",
    id: "p-2",
    name: "Solkadhi Bottle (500ml)",
    price: 100,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=600&auto=format&fit=crop",
    category: "Beverages",
    inStock: true,
  },
  {
    _id: "p-3",
    id: "p-3",
    name: "Extra Pav Pair (2 pcs)",
    price: 20,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop",
    category: "Sides",
    inStock: true,
  },
];

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
      if (shopData) {
        setShop(shopData);
        try {
          const productData = await getShopProducts(shopData._id);
          setProducts(productData?.length ? productData : DEMO_PRODUCTS);
        } catch {
          setProducts(DEMO_PRODUCTS);
        }
      } else {
        const fallbackShop = DEMO_SHOPS[slug] || {
          ...DEMO_SHOPS["kolhapur-misal-house"],
          slug,
          name: slug ? slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") : "Local Shop",
        };
        setShop(fallbackShop);
        setProducts(DEMO_PRODUCTS);
      }
    } catch {
      const fallbackShop = DEMO_SHOPS[slug] || {
        ...DEMO_SHOPS["kolhapur-misal-house"],
        slug,
        name: slug ? slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") : "Local Shop",
      };
      setShop(fallbackShop);
      setProducts(DEMO_PRODUCTS);
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
