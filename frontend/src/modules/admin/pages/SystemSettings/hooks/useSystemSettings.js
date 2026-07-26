import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";

export function useSystemSettings(){
  const { data, isLoading } = useQuery(["admin","settings"], () => api.get('/admin/settings').then(r=>r.data));
  return {
    settings: data || {},
    loading: isLoading,
  };
}
