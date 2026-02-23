import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { authService } from '@/services/auth.service';
import { useAuthStore } from '@/stores/auth-store';
import type { UpdateProfileRequest } from '@/types';

export const useUpdateProfile = () => {
  const { refreshProfile } = useAuthStore();

  return useMutation({
    mutationFn: (data: UpdateProfileRequest) => authService.updateProfile(data),
    onSuccess: async () => {
      toast.success('Profile updated successfully');
      await refreshProfile();
    },
    onError: (error: { message: string }) => {
      toast.error(error.message || 'Failed to update profile');
    },
  });
};
