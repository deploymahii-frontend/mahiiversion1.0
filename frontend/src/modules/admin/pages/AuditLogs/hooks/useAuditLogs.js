import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";

export function useAuditLogs(){
  const { data, isLoading } = useQuery(["admin","auditLogs"], () => api.get('/admin/audit-logs').then(r=>r.data));
  return {
    logs: data || [],
    loading: isLoading,
  };
}
