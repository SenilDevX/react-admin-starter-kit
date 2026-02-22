import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { authService } from '@/services/auth.service';
import { ROUTES } from '@/lib/constants';
import type { ResetPasswordRequest } from '@/types';

export const useResetPassword = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: ResetPasswordRequest) => authService.resetPassword(data),
    onSuccess: () => {
      toast.success('Password reset successfully. Please log in.');
      void navigate(ROUTES.LOGIN);
    },
    onError: (error: { message: string }) => {
      toast.error(error.message || 'Failed to reset password');
    },
  });
};
