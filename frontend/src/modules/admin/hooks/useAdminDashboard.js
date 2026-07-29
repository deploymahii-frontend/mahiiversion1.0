import { useQuery } from "@tanstack/react-query";
import { adminDashboardApi } from "../services/adminDashboard.api";

export function useAdminDashboard(){
  const { data, isLoading } = useQuery(["admin","dashboard"], () => adminDashboardApi.dashboard().then(r=>r.data));
  return {
    dashboard: data || {},
    loading: isLoading,
  };
}
