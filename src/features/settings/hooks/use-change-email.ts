import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { authService } from '@/services/auth.service';
import type { ChangeEmailRequest } from '@/types';

export const useChangeEmail = () => {
  return useMutation({
    mutationFn: (data: ChangeEmailRequest) => authService.changeEmail(data),
    onSuccess: () => {
      toast.success('Email changed successfully');
    },
    onError: (error: { message: string }) => {
      toast.error(error.message || 'Failed to change email');
    },
  });
};
