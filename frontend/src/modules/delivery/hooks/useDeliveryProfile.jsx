import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";

export function useDeliveryProfile() {
  const { data, isLoading, error } = useQuery(
    ["delivery", "profile"],
    async () => {
      const response = await api.get("/delivery/profile");
      return response.data;
    }
  );

  return {
    partner: data?.partner || {},
    loading: isLoading,
    error,
  };
}
