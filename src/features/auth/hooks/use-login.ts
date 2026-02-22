import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/use-auth';
import { ROUTES } from '@/lib/constants';
import type { LoginRequest } from '@/types';

export const useLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginRequest) => login(data),
    onSuccess: (result) => {
      if (result.requiresTwoFactor) {
        void navigate(ROUTES.TWO_FACTOR_VERIFY);
      } else {
        toast.success('Welcome back!');
        void navigate(ROUTES.DASHBOARD);
      }
    },
    onError: (error: { message: string }) => {
      toast.error(error.message || 'Login failed');
    },
  });
};
