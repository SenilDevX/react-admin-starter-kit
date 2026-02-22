import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { verifyOtpSchema, type VerifyOtpFormValues } from '@/validations/auth.schema';
import { useTwoFactorSetup, useConfirmTwoFactor } from '../hooks/use-two-factor-setup';
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
import { Loader2, ShieldCheck } from 'lucide-react';

export const TwoFactorSetupCard = () => {
  const { mutate: setupTwoFactor, data: setupData, isPending: isSettingUp } = useTwoFactorSetup();
  const { mutate: confirmTwoFactor, isPending: isConfirming } = useConfirmTwoFactor();

  const form = useForm<VerifyOtpFormValues>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: { token: '' },
  });

  const onSubmit = (data: VerifyOtpFormValues) => {
    confirmTwoFactor(data);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Two-Factor Authentication</CardTitle>
        </div>
        <CardDescription>
          Add an extra layer of security to your account by enabling two-factor authentication.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!setupData ? (
          <Button onClick={() => setupTwoFactor()} disabled={isSettingUp}>
            {isSettingUp && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Enable Two-Factor Authentication
          </Button>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Scan the QR code below with your authenticator app (e.g., Google Authenticator, Authy).
              </p>
              <div className="flex justify-center">
                <img
                  src={setupData.qrCodeUrl}
                  alt="Two-factor authentication QR code"
                  className="h-48 w-48"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium">Manual entry key:</p>
                <code className="block rounded bg-muted px-3 py-2 font-mono text-sm break-all">
                  {setupData.secret}
                </code>
              </div>
            </div>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="token"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Verification Code</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter 6-digit code"
                          maxLength={6}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isConfirming}>
                  {isConfirming && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Verify and Enable
                </Button>
              </form>
            </Form>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
