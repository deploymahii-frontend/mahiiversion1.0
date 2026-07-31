import { useQuery } from "@tanstack/react-query";
import reviewService from "../services/review.service";

export default function useReviews() {
  return useQuery({
    queryKey: ["customer-reviews"],
    queryFn: reviewService.getReviews,
    staleTime: 1000 * 60 * 5,
  });
}
