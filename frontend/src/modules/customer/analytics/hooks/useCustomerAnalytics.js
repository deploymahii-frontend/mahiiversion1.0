import { useQuery } from "@tanstack/react-query";
import analyticsService from "../services/analytics.service";

export default function useCustomerAnalytics() {
  return useQuery({
    queryKey: ["customer-analytics"],
    queryFn: analyticsService.getDashboard,
    staleTime: 1000 * 60 * 10,
  });
}
