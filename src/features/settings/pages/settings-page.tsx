import { PageHeader } from '@/components/shared/page-header';
import { Tabs, TabsContent, TabsContents, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthStore } from '@/stores/auth-store';
import { ProfileForm } from '../components/profile-form';
import { ChangePasswordForm } from '../components/change-password-form';
import { ChangeEmailForm } from '../components/change-email-form';
import { TwoFactorSetupCard } from '../components/two-factor-setup-card';
import { TwoFactorDisableCard } from '../components/two-factor-disable-card';
import { UserRound, Lock, Mail, ShieldCheck } from 'lucide-react';

export const SettingsPage = () => {
  const { user } = useAuthStore();

  return (
    <div>
      <PageHeader title="Settings" description="Manage your account settings." />
      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">
            <UserRound className="h-4 w-4" />
            Profile
          </TabsTrigger>
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
        <TabsContents className="mt-6">
          <TabsContent value="profile">
            <ProfileForm />
          </TabsContent>
          <TabsContent value="password">
            <ChangePasswordForm />
          </TabsContent>
          <TabsContent value="email">
            <ChangeEmailForm />
          </TabsContent>
          <TabsContent value="two-factor">
            {user?.isTwoFactorEnabled ? <TwoFactorDisableCard /> : <TwoFactorSetupCard />}
          </TabsContent>
        </TabsContents>
      </Tabs>
    </div>
  );
};
