import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import * as shopService from "../services/shopService";
import useDebounce from "./useDebounce";
import { mapShops } from "../utils/shopAdapter";

const MOCK_EXPLORE_SHOPS = [
  {
    _id: "mock-1",
    id: "mock-1",
    name: "Kolhapur Misal House",
    slug: "kolhapur-misal-house",
    category: "Restaurants",
    rating: 4.8,
    distance: "1.2 km",
    price: "₹120 for one",
    isOpen: true,
    coverImage: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop",
    address: { city: "Rajarampuri, Kolhapur" },
  },
  {
    _id: "mock-2",
    id: "mock-2",
    name: "Shree Krishna Organic Mart",
    slug: "shree-krishna-organic-mart",
    category: "Grocery",
    rating: 4.6,
    distance: "0.8 km",
    price: "₹500 min order",
    isOpen: true,
    coverImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop",
    address: { city: "Tarabai Park, Kolhapur" },
  },
  {
    _id: "mock-3",
    id: "mock-3",
    name: "Mahalaxmi Sweets & Bakers",
    slug: "mahalaxmi-sweets-bakers",
    category: "Bakery",
    rating: 4.9,
    distance: "2.1 km",
    price: "₹250 for two",
    isOpen: true,
    coverImage: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop",
    address: { city: "Rankala Lake, Kolhapur" },
  },
  {
    _id: "mock-4",
    id: "mock-4",
    name: "Royal Fresh Dairy & Desserts",
    slug: "royal-fresh-dairy",
    category: "Dairy",
    rating: 4.7,
    distance: "0.5 km",
    price: "₹80 min order",
    isOpen: true,
    coverImage: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&auto=format&fit=crop",
    address: { city: "Shahupuri, Kolhapur" },
  },
];

const CATEGORIES_LIST = ["ALL", "Restaurants", "Grocery", "Bakery", "Dairy", "Services"];

export default function useExplore() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const debouncedSearch = useDebounce(search);
  const [category, setCategory] = useState(searchParams.get("category") || "ALL");
  const [sort, setSort] = useState(searchParams.get("sort") || "POPULAR");

  async function loadShops() {
    try {
      setLoading(true);

      const data = debouncedSearch.trim()
        ? await shopService.searchShops(debouncedSearch)
        : await shopService.getShops();

      const mapped = mapShops(data || []);
      setShops(mapped.length > 0 ? mapped : mapShops(MOCK_EXPLORE_SHOPS));
    } catch (err) {
      console.error(err);
      setShops(mapShops(MOCK_EXPLORE_SHOPS));
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const params = {};

    if (search) params.search = search;
    if (category !== "ALL") params.category = category;
    if (sort !== "POPULAR") params.sort = sort;

    setSearchParams(params);
  }, [search, category, sort, setSearchParams]);

  useEffect(() => {
    loadShops();
  }, [debouncedSearch]);

  const filteredShops = useMemo(() => {
    let result = [...shops];

    if (category !== "ALL") {
      result = result.filter(
        (shop) => String(shop.category || "").toLowerCase() === category.toLowerCase()
      );
    }

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter((shop) =>
        String(shop.name || "").toLowerCase().includes(query)
      );
    }

    switch (sort) {
      case "RATING":
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;

      default:
        break;
    }

    return result;
  }, [shops, search, category, sort]);

  return {
    loading,
    shops: filteredShops,
    categories: CATEGORIES_LIST,

    search,
    setSearch,

    category,
    setCategory,

    sort,
    setSort,

    refresh: loadShops,
  };
}
