import { useQuery } from "@tanstack/react-query";
import api from "@/services/api";

export function useLiveNavigation() {
  const { data, isLoading, error } = useQuery(
    ["delivery", "navigation"],
    async () => {
      const response = await api.get("/delivery/navigation");
      return response.data;
    }
  );

  return {
    assignment: data?.assignment || {},
    currentLocation: data?.currentLocation || { lat: 0, lng: 0 },
    destination: data?.destination || { lat: 0, lng: 0 },
    loading: isLoading,
    error,
  };
}
