import { useQuery } from "@tanstack/react-query";
import ordersService from "../services/orders.service";

export default function useOrder(id) {
  return useQuery({
    queryKey: ["customer-order", id],
    queryFn: async () => {
      const { data } = await ordersService.getOrder(id);
      return data.data;
    },
    enabled: !!id,
    staleTime: 1000 * 60 * 1, // 1 min
  });
}
