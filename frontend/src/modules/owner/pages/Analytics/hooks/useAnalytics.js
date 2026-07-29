import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";

export function useAnalytics(){
  const { data, isLoading } = useQuery(["owner","analytics"], () => api.get('/owner/analytics').then(r=>r.data));
  return {
    analytics: data || {},
    loading: isLoading,
  };
}
