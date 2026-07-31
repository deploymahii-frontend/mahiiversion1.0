import { useQuery } from "@tanstack/react-query";
import referralService from "../services/referral.service";

export default function useReferral() {
  return useQuery({
    queryKey: ["customer-referrals"],
    queryFn: referralService.getReferralDashboard,
    staleTime: 1000 * 60 * 5,
  });
}
