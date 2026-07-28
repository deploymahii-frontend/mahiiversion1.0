import { useState, useEffect, useCallback } from "react";
import { searchShops } from "../services/explore.service";

export function useExplore(initialParams = {}) {
    const [shops, setShops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [filters, setFilters] = useState({
        search: "",
        sort: "relevance",
        category: "",
        rating: "",
        pureVeg: false,
        isOpenNow: false,
        ...initialParams,
    });

    const fetchShops = useCallback(async (isReset = false) => {
        try {
            setLoading(true);
            const currentPage = isReset ? 1 : page;
            const params = {
                ...filters,
                page: currentPage,
                limit: 20,
            };

            const response = await searchShops(params);
            const data = response.data?.shops || response.shops || response.data || [];

            if (isReset) {
                setShops(data);
                setPage(1);
            } else {
                setShops((prev) => [...prev, ...data]);
            }

            setHasMore(data.length >= 20);
        } catch (error) {
            console.error("Failed to fetch shops", error);
        } finally {
            setLoading(false);
        }
    }, [filters, page]);

    useEffect(() => {
        fetchShops(true);
    }, [filters]);

    const updateFilter = (key, value) => {
        setFilters((prev) => ({ ...prev, [key]: value }));
    };

    const clearFilters = () => {
        setFilters({
            search: "",
            sort: "relevance",
            category: "",
            rating: "",
            pureVeg: false,
            isOpenNow: false,
        });
    };

    const loadMore = () => {
        if (!loading && hasMore) {
            setPage((prev) => prev + 1);
        }
    };

    return {
        shops,
        loading,
        hasMore,
        filters,
        updateFilter,
        clearFilters,
        loadMore,
    };
}
