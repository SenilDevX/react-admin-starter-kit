import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { disableTwoFactorSchema, type DisableTwoFactorFormValues } from '@/validations/auth.schema';
import { useDisableTwoFactor } from '../hooks/use-two-factor-setup';
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
import { ShieldOff } from 'lucide-react';

export const TwoFactorDisableCard = () => {
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
        </div>
      </CardContent>
    </Card>
  );
};
