import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import * as shopService from "../services/shopService";
import useDebounce from "./useDebounce";
import { mapShops } from "../utils/shopAdapter";

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

      setShops(mapShops(data || []));
    } catch (err) {
      console.error(err);
      setShops([]);
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
