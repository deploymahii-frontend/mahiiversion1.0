import { useQuery } from "@tanstack/react-query";
import promotionService from "../services/promotion.service";

export default function useCoupons() {
  return useQuery({
    queryKey: ["customer-coupons"],
    queryFn: promotionService.getCoupons,
    staleTime: 1000 * 60 * 5,
  });
}
