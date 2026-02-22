import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { authService } from '@/services/auth.service';
import type { ForgotPasswordRequest } from '@/types';

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) => authService.forgotPassword(data),
    onSuccess: () => {
      toast.success('Password reset email sent. Check your inbox.');
    },
    onError: (error: { message: string }) => {
      toast.error(error.message || 'Failed to send reset email');
    },
  });
};
