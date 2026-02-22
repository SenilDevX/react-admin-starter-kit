import { PageHeader } from '@/components/shared/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/use-auth';
import { ChangePasswordForm } from '../components/change-password-form';
import { ChangeEmailForm } from '../components/change-email-form';
import { TwoFactorSetupCard } from '../components/two-factor-setup-card';
import { TwoFactorDisableCard } from '../components/two-factor-disable-card';
import { Lock, Mail, ShieldCheck } from 'lucide-react';

export const SettingsPage = () => {
  const { user } = useAuth();

  return (
    <div>
      <PageHeader title="Settings" description="Manage your account settings." />
      <Tabs defaultValue="password">
        <TabsList>
          <TabsTrigger value="password">
            <Lock className="h-4 w-4" />
            Password
          </TabsTrigger>
          <TabsTrigger value="email">
            <Mail className="h-4 w-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="two-factor">
            <ShieldCheck className="h-4 w-4" />
            Two-Factor Auth
          </TabsTrigger>
        </TabsList>
        <TabsContent value="password" className="mt-6">
          <ChangePasswordForm />
        </TabsContent>
        <TabsContent value="email" className="mt-6">
          <ChangeEmailForm />
        </TabsContent>
        <TabsContent value="two-factor" className="mt-6">
          {user?.isTwoFactorEnabled ? <TwoFactorDisableCard /> : <TwoFactorSetupCard />}
        </TabsContent>
      </Tabs>
    </div>
  );
};
