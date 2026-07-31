import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import settingsService from "../services/settings.service";
import useAuthStore from "@/modules/auth/store/auth.store";

export default function useSettings() {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);

  const query = useQuery({
    queryKey: ["customer-settings", user?._id],
    queryFn: async () => {
      try {
        const data = await settingsService.getSettings();
        return data || {};
      } catch (err) {
        console.warn("Settings API not available, returning defaults.");
        return {
          theme: "SYSTEM",
          notifications: { email: true, sms: false, push: true },
          privacy: { shareData: false },
        };
      }
    },
    staleTime: 1000 * 60 * 10,
  });

  const updateMutation = useMutation({
    mutationFn: (payload) => settingsService.updateSettings(payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["customer-settings"]);
    },
  });

  return {
    ...query,
    updateSettings: updateMutation.mutateAsync,
  };
}
