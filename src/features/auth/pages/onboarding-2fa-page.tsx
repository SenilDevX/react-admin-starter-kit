import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuthStore } from '@/stores/auth-store';
import { authService } from '@/services/auth.service';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { verifyOtpSchema, type VerifyOtpFormValues } from '@/validations/auth.schema';
import { ROUTES } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ShieldCheck } from 'lucide-react';
import type { TwoFactorSetupResponse } from '@/types';

export const Onboarding2faPage = () => {
  const navigate = useNavigate();
  const { refreshProfile } = useAuthStore();
  const [setupData, setSetupData] = useState<TwoFactorSetupResponse | null>(null);

  const { mutate: setup, isPending: isSettingUp } = useMutation({
    mutationFn: () => authService.setupTwoFactor(),
    onSuccess: (data) => setSetupData(data),
    onError: () => toast.error('Failed to setup 2FA'),
  });

  const { mutate: confirm, isPending: isConfirming } = useMutation({
    mutationFn: (data: { token: string }) => authService.confirmTwoFactor(data),
    onSuccess: async () => {
      toast.success('Two-factor authentication enabled');
      await refreshProfile();
      navigate(ROUTES.DASHBOARD);
    },
    onError: () => toast.error('Invalid verification code'),
  });

  const form = useForm<VerifyOtpFormValues>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: { token: '' },
  });

  const onSubmit = (data: VerifyOtpFormValues) => {
    confirm({ token: data.token });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <ShieldCheck className="h-6 w-6 text-primary" />
        </div>
        <CardTitle>Set up two-factor authentication</CardTitle>
        <CardDescription>Your account requires 2FA. Set it up to continue.</CardDescription>
      </CardHeader>
      <CardContent>
        {!setupData ? (
          <Button onClick={() => setup()} loading={isSettingUp} className="w-full">
            Generate QR Code
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              <img
                src={setupData.qrCodeUrl}
                alt="QR Code"
                className="h-48 w-48 rounded-lg border"
              />
            </div>
            <div className="rounded-lg bg-muted p-3 text-center">
              <p className="mb-1 text-xs text-muted-foreground">Manual entry key</p>
              <code className="text-sm font-mono font-medium">{setupData.secret}</code>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="token"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verification code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="000000"
                          maxLength={6}
                          className="text-center text-lg tracking-widest"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" loading={isConfirming}>
                  Verify & Enable
                </Button>
              </form>
            </Form>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
