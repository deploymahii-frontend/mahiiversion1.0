import { useQuery } from "@tanstack/react-query";
import walletService from "../services/wallet.service";

export default function useWallet() {
  return useQuery({
    queryKey: ["customer-wallet"],
    queryFn: async () => {
      try {
        const { data } = await walletService.getWallet();
        return data?.data || data || {};
      } catch (err) {
        console.warn("Wallet API unavailable, using defaults:", err?.message);
        return {
          balance: 0,
          points: 0,
          totalEarned: 0,
          totalSpent: 0,
        };
      }
    },
    staleTime: 1000 * 60 * 3,
  });
}
