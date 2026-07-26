import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { searchApi } from "../services/search.api";

export function useExplore() {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({});

  const { data, isLoading } = useQuery({
    queryKey: ["explore", query, filters],
    queryFn: () => searchApi.search({ query, filters }),
  });

  return {
    query,
    setQuery,
    filters,
    setFilters,
    loading: isLoading,
    results: data?.results || [],
    suggestions: data?.suggestions || [],
  };
}
