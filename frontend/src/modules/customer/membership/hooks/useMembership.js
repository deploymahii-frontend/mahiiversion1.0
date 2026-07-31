import { useQuery } from "@tanstack/react-query";
import membershipService from "../services/membership.service";

export default function useMembership() {
  return useQuery({
    queryKey: ["customer-membership"],
    queryFn: membershipService.getMembership,
    staleTime: 1000 * 60 * 10,
  });
}
