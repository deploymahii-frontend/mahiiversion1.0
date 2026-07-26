import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";

export function useDeliveryDashboard() {
  const { data, isLoading, error } = useQuery(
    ["delivery", "dashboard"],
    async () => {
      const response = await api.get("/delivery/dashboard");
      return response.data;
    }
  );

  return {
    partner: data?.partner || {},
    activeOrder: data?.activeOrder || null,
    earnings: data?.earnings || {},
    loading: isLoading,
    error,
  };
}
