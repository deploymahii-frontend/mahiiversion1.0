import { useQuery } from "@tanstack/react-query";
import { momentsApi } from "../services/moments.api";

export function useMoments(){
  const { data, isLoading } = useQuery(["owner","moments"], () => momentsApi.list().then(r=>r.data));
  return {
    moments: data || [],
    loading: isLoading,
  };
}
