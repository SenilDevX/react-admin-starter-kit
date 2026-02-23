import { Navigate, Outlet } from 'react-router';
import { useAuthStore } from '@/stores/auth-store';
import { ROUTES } from '@/lib/constants';

export const OnboardingGuard = () => {
  const { user } = useAuthStore();

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
