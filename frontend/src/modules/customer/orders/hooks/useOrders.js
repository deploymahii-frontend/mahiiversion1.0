import { useQuery } from "@tanstack/react-query";
import ordersService from "../services/orders.service";
import useAuthStore from "@/modules/auth/store/auth.store";

export default function useOrders(params = {}) {
  const user = useAuthStore((s) => s.user);

  return useQuery({
    queryKey: ["customer-orders", user?._id, params],
    queryFn: async () => {
      try {
        const { data } = await ordersService.getOrders(params);
        return Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : [];
      } catch (err) {
        console.warn("Orders API not available, returning defaults.");
        return [];
      }
    },
    staleTime: 1000 * 60 * 2, // 2 min — orders update frequently
  });
}
