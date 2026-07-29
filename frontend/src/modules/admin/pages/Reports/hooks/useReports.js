import { useQuery, useState } from "@tanstack/react-query";
import api from "@/services/api";

export function useReports(){
  const [filters, setFilters] = useState({});
  const { data, isLoading } = useQuery(["admin","reports", filters], () => api.get('/admin/reports', { params: filters }).then(r=>r.data));
  return {
    reports: data?.reports || [],
    summary: data?.summary || {},
    loading: isLoading,
    filters,
    setFilters,
  };
}
