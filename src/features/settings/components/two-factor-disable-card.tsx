import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { disableTwoFactorSchema, type DisableTwoFactorFormValues } from '@/validations/auth.schema';
import { useDisableTwoFactor } from '../hooks/use-two-factor-setup';
import { useAuthStore } from '@/stores/auth-store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/ui/password-input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ShieldOff, Info } from 'lucide-react';

export const TwoFactorDisableCard = () => {
  const { user } = useAuthStore();
  const roleRequires2FA = user?.role?.requiresTwoFactor ?? false;
  const { mutate: disableTwoFactor, isPending } = useDisableTwoFactor();

  const form = useForm<DisableTwoFactorFormValues>({
    resolver: zodResolver(disableTwoFactorSchema),
    defaultValues: { password: '', token: '' },
  });

  const onSubmit = (data: DisableTwoFactorFormValues) => {
    disableTwoFactor(data, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <ShieldOff className="h-5 w-5 text-muted-foreground" />
          <CardTitle>Disable Two-Factor Authentication</CardTitle>
        </div>
        <CardDescription>
          Remove two-factor authentication from your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {roleRequires2FA ? (
            <div className="flex items-start gap-3 rounded-md border border-border bg-muted/50 p-4">
              <Info className="h-5 w-5 shrink-0 text-muted-foreground mt-0.5" />
              <div className="space-y-1">
                <p className="text-sm font-medium">
                  Two-factor authentication is required by your role
                </p>
                <p className="text-sm text-muted-foreground">
                  Your role ({user?.role?.name}) requires two-factor authentication to be enabled.
                  Contact an administrator if you need to change this.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="rounded-md border border-destructive/50 bg-destructive/10 p-4">
                <p className="text-sm text-destructive">
                  Warning: Disabling two-factor authentication will reduce the security of your account.
                  Your account will only be protected by your password.
                </p>
              </div>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <PasswordInput placeholder="Enter your password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="token"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Authentication Code</FormLabel>
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
                  <Button type="submit" variant="destructive" loading={isPending}>
                    Disable Two-Factor Authentication
                  </Button>
                </form>
              </Form>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
