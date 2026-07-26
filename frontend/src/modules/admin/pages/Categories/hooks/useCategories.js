import { useQuery } from "@tanstack/react-query";
import { categoriesApi } from "../services/categories.api";

export function useCategories(){
  const { data, isLoading } = useQuery(["admin","categories"], () => categoriesApi.list().then(r=>r.data));
  return {
    categories: data || [],
    loading: isLoading,
  };
}
