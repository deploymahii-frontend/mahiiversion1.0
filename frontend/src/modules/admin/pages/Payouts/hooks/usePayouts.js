import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";

export function usePayouts(){
  const { data, isLoading } = useQuery(["admin","payouts"], () => api.get('/admin/payouts').then(r=>r.data));
  return {
    payouts: data || { pending: [], history: [] },
    summary: data?.summary || {},
    loading: isLoading,
  };
}
