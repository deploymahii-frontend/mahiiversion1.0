import { useQuery } from "@tanstack/react-query";
import supportService from "../services/support.service";

export default function useTickets() {
  return useQuery({
    queryKey: ["customer-tickets"],
    queryFn: supportService.getTickets,
    staleTime: 1000 * 60 * 5,
  });
}
