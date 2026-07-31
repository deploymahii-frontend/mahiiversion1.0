import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import profileService from "../services/profile.service";
import useAuthStore from "@/modules/auth/store/auth.store";

export default function useProfile() {
  const queryClient = useQueryClient();
  const user = useAuthStore((s) => s.user);

  const query = useQuery({
    queryKey: ["customer-profile", user?._id || user?.id],
    queryFn: async () => {
      try {
        const data = await profileService.getProfile();
        return data || {};
      } catch (err) {
        console.warn("Profile API unavailable, using local user data:", err?.message);
        return {};
      }
    },
    staleTime: 1000 * 60 * 5,
  });

  const updateMutation = useMutation({
    mutationFn: (payload) => profileService.updateProfile(payload),
    onSuccess: (updatedData) => {
      queryClient.invalidateQueries(["customer-profile"]);
      queryClient.invalidateQueries(["customer-dashboard"]);
    },
  });

  return {
    ...query,
    updateProfile: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
  };
}
