import { useQuery } from "@tanstack/react-query";
import { customerService } from "../services/customer.service";

export function useRecommendedShops() {
  return useQuery({
    queryKey: ["recommended-shops"],
    queryFn: async () => {
      const { data } = await customerService.getRecommendedShops();
      return data.data;
    },
    staleTime: 1000 * 60 * 5,
  });
}
