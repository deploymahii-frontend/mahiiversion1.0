import { useQuery } from "@tanstack/react-query";
import paymentService from "../services/payment.service";

export default function usePaymentMethods() {
  return useQuery({
    queryKey: ["customer-payment-methods"],
    queryFn: paymentService.getPaymentMethods,
    staleTime: 1000 * 60 * 5,
  });
}
