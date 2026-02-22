import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/use-auth';
import { ROUTES } from '@/lib/constants';
import type { RegisterRequest } from '@/types';

export const useRegister = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterRequest) => register(data),
    onSuccess: () => {
      toast.success('Account created! Please log in.');
      void navigate(ROUTES.LOGIN);
    },
    onError: (error: { message: string }) => {
      toast.error(error.message || 'Registration failed');
    },
  });
};
