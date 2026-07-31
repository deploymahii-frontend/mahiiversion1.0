import { useQuery } from "@tanstack/react-query";
import { customerService } from "../services/customer.service";

export function useNearbyShops(location) {
  return useQuery({
    queryKey: ["nearby-shops", location],
    queryFn: async () => {
      const { data } = await customerService.getNearbyShops(location);
      return data.data;
    },
    enabled: !!location,
    staleTime: 1000 * 60 * 5,
  });
}
