import { useEffect, useState } from "react";
import shopAPI from "../api/shop.api";

const DEMO_SHOPS = {
  "kolhapur-misal-house": {
    _id: "mock-1",
    id: "mock-1",
    name: "Kolhapur Misal House",
    slug: "kolhapur-misal-house",
    category: "Restaurants & Cafes",
    rating: 4.8,
    reviewsCount: 128,
    distance: "1.2 km",
    price: "₹120 for one",
    isOpen: true,
    coverImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=1200&auto=format&fit=crop",
    address: { street: "Main Road, Rajarampuri", city: "Kolhapur", state: "Maharashtra", pincode: "416008" },
    phone: "+91 98230 11223",
    hours: "7:00 AM - 10:00 PM",
    facilities: ["Air Conditioned", "Takeaway Available", "UPI Payment", "Free Parking"],
    description: "Famous for authentic, mouth-watering Kolhapuri Kat Misal made using traditional family spices. Served fresh with crispy Farsan, pav, onions and Solkadhi.",
  },
  "shree-krishna-organic-mart": {
    _id: "mock-2",
    id: "mock-2",
    name: "Shree Krishna Organic Mart",
    slug: "shree-krishna-organic-mart",
    category: "Organic Grocery",
    rating: 4.6,
    reviewsCount: 84,
    distance: "0.8 km",
    price: "₹500 min order",
    isOpen: true,
    coverImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&auto=format&fit=crop",
    address: { street: "Opposite Circuit House, Tarabai Park", city: "Kolhapur", state: "Maharashtra", pincode: "416003" },
    phone: "+91 94220 88990",
    hours: "8:00 AM - 9:30 PM",
    facilities: ["Organic Certified", "Home Delivery", "Card & UPI", "Eco-friendly Packaging"],
    description: "Your local destination for 100% certified organic vegetables, cold-pressed oils, unpolished pulses, and natural honey sourced directly from local farmers.",
  },
  "mahalaxmi-sweets-bakers": {
    _id: "mock-3",
    id: "mock-3",
    name: "Mahalaxmi Sweets & Bakers",
    slug: "mahalaxmi-sweets-bakers",
    category: "Sweets & Bakery",
    rating: 4.9,
    reviewsCount: 210,
    distance: "2.1 km",
    price: "₹250 for two",
    isOpen: true,
    coverImage: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1200&auto=format&fit=crop",
    address: { street: "Rankala Chowk", city: "Kolhapur", state: "Maharashtra", pincode: "416012" },
    phone: "+91 98900 44556",
    hours: "6:30 AM - 10:30 PM",
    facilities: ["Fresh Baked Daily", "Custom Cakes", "UPI Accepted", "Seating Available"],
    description: "Kolhapur's beloved sweet shop offering hot Jalebis, Dhokla, pedas, and fresh oven baked breads every morning.",
  },
  "royal-fresh-dairy": {
    _id: "mock-4",
    id: "mock-4",
    name: "Royal Fresh Dairy & Desserts",
    slug: "royal-fresh-dairy",
    category: "Dairy & Ice Cream",
    rating: 4.7,
    reviewsCount: 95,
    distance: "0.5 km",
    price: "₹80 min order",
    isOpen: true,
    coverImage: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=1200&auto=format&fit=crop",
    address: { street: "Station Road, Shahupuri", city: "Kolhapur", state: "Maharashtra", pincode: "416001" },
    phone: "+91 97640 55667",
    hours: "6:00 AM - 10:00 PM",
    facilities: ["Pure Cow Milk", "Fresh Shrikhand", "Cold Storage", "Quick Pickup"],
    description: "Pure A2 Buffalo & Cow Milk, fresh Paneer, Kesar Shrikhand, and artisanal ice creams prepared fresh daily.",
  },
};

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
        const fetched = response?.data?.data || response?.data;
        if (fetched) {
          setShop(fetched);
        } else if (DEMO_SHOPS[slug]) {
          setShop(DEMO_SHOPS[slug]);
        } else {
          setShop({
            ...DEMO_SHOPS["kolhapur-misal-house"],
            slug,
            name: slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
          });
        }
      } catch {
        if (DEMO_SHOPS[slug]) {
          setShop(DEMO_SHOPS[slug]);
        } else {
          setShop({
            ...DEMO_SHOPS["kolhapur-misal-house"],
            slug,
            name: slug.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
          });
        }
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
