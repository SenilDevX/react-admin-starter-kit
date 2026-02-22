import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/hooks/use-auth';
import { ROUTES } from '@/lib/constants';

export const OnboardingGuard = () => {
  const { user } = useAuth();

  if (!user) return null;

  // Priority: 2FA setup first, then password change
  if (user.mustSetupTwoFactor) {
    return <Navigate to={ROUTES.ONBOARDING_2FA} replace />;
  }

  if (user.mustChangePassword) {
    return <Navigate to={ROUTES.ONBOARDING_PASSWORD} replace />;
  }

  return <Outlet />;
};
