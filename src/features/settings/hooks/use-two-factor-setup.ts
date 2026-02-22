import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { authService } from '@/services/auth.service';
import type { VerifyOtpRequest, DisableTwoFactorRequest } from '@/types';

export const useTwoFactorSetup = () => {
  return useMutation({
    mutationFn: () => authService.setupTwoFactor(),
    onError: (error: { message: string }) => {
      toast.error(error.message || 'Failed to setup two-factor authentication');
    },
  });
};

export const useConfirmTwoFactor = () => {
  return useMutation({
    mutationFn: (data: VerifyOtpRequest) => authService.confirmTwoFactor(data),
    onSuccess: () => {
      toast.success('2FA enabled successfully');
    },
    onError: (error: { message: string }) => {
      toast.error(error.message || 'Failed to verify two-factor code');
    },
  });
};

export const useDisableTwoFactor = () => {
  return useMutation({
    mutationFn: (data: DisableTwoFactorRequest) => authService.disableTwoFactor(data),
    onSuccess: () => {
      toast.success('2FA disabled successfully');
    },
    onError: (error: { message: string }) => {
      toast.error(error.message || 'Failed to disable two-factor authentication');
    },
  });
};
