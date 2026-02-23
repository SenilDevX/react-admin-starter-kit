import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useAuthStore } from '@/stores/auth-store';
import { ROUTES } from '@/lib/constants';

export const useTwoFactorAuth = () => {
  const { verifyTwoFactor } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (token: string) => verifyTwoFactor(token),
    onSuccess: () => {
      toast.success('Two-factor authentication verified');
      void navigate(ROUTES.DASHBOARD);
    },
    onError: (error: { message: string }) => {
      toast.error(error.message || 'Invalid verification code');
    },
  });
};
