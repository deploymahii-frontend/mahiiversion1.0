import { useQuery } from "@tanstack/react-query";
import { customerService } from "../services/customer.service";

export default function useCustomerDashboard() {
  return useQuery({
    queryKey: ["customer-dashboard"],
    queryFn: async () => {
      const { data } = await customerService.getDashboard();
      return data.data;
    },
    staleTime: 1000 * 60 * 2, // 2 minutes cache
  });
}
