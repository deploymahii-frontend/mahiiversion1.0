import { useQuery } from "@tanstack/react-query";
import addressService from "../services/address.service";
import useAuthStore from "@/modules/auth/store/auth.store";

export default function useAddresses() {
  const user = useAuthStore((s) => s.user);

  return useQuery({
    queryKey: ["customer-addresses", user?._id],
    queryFn: async () => {
      try {
        const data = await addressService.getAddresses();
        return Array.isArray(data) ? data : [];
      } catch (err) {
        console.warn("Addresses API not available, returning defaults.");
        return [];
      }
    },
    staleTime: 1000 * 60 * 10,
  });
}
