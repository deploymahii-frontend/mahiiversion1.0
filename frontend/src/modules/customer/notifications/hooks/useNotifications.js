import { useQuery } from "@tanstack/react-query";
import notificationService from "../services/notification.service";
import useAuthStore from "@/modules/auth/store/auth.store";

export default function useNotifications() {
  const user = useAuthStore((s) => s.user);

  return useQuery({
    queryKey: ["customer-notifications", user?._id],
    queryFn: async () => {
      try {
        const data = await notificationService.getNotifications();
        return Array.isArray(data) ? data : [];
      } catch (err) {
        console.warn("Notifications API not available, returning defaults.");
        return [];
      }
    },
    staleTime: 1000 * 60 * 2,
  });
}
