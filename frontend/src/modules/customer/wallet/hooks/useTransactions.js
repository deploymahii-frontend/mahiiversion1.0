import { useQuery } from "@tanstack/react-query";
import walletService from "../services/wallet.service";

export default function useTransactions(params = {}) {
  return useQuery({
    queryKey: ["customer-transactions", params],
    queryFn: async () => {
      try {
        const { data } = await walletService.getTransactions(params);
        return data?.data || data || [];
      } catch (err) {
        console.warn("Transactions API unavailable:", err?.message);
        return [];
      }
    },
    staleTime: 1000 * 60 * 2,
  });
}
