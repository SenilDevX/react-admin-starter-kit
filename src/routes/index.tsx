import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router';
import { AuthLayout } from '@/components/layout/auth-layout';
import { AppLayout } from '@/components/layout/app-layout';
import { OnboardingLayout } from '@/components/layout/onboarding-layout';
import { ProtectedRoute } from './protected-route';
import { OnboardingGuard } from './onboarding-guard';
import { LoadingSpinner } from '@/components/shared/loading-spinner';
import { RouteErrorFallback } from '@/components/shared/route-error-fallback';

const LoginPage = lazy(() =>
  import('@/features/auth/pages/login-page').then((m) => ({ default: m.LoginPage })),
);
const RegisterPage = lazy(() =>
  import('@/features/auth/pages/register-page').then((m) => ({ default: m.RegisterPage })),
);
const ForgotPasswordPage = lazy(() =>
  import('@/features/auth/pages/forgot-password-page').then((m) => ({
    default: m.ForgotPasswordPage,
  })),
);
const ResetPasswordPage = lazy(() =>
  import('@/features/auth/pages/reset-password-page').then((m) => ({
    default: m.ResetPasswordPage,
  })),
);
const TwoFactorVerifyPage = lazy(() =>
  import('@/features/auth/pages/two-factor-verify-page').then((m) => ({
    default: m.TwoFactorVerifyPage,
  })),
);
const Onboarding2faPage = lazy(() =>
  import('@/features/auth/pages/onboarding-2fa-page').then((m) => ({
    default: m.Onboarding2faPage,
  })),
);
const OnboardingPasswordPage = lazy(() =>
  import('@/features/auth/pages/onboarding-password-page').then((m) => ({
    default: m.OnboardingPasswordPage,
  })),
);
const DashboardPage = lazy(() =>
  import('@/features/dashboard/pages/dashboard-page').then((m) => ({
    default: m.DashboardPage,
  })),
);
const TodosPage = lazy(() =>
  import('@/features/todos/pages/todos-page').then((m) => ({ default: m.TodosPage })),
);
const UsersPage = lazy(() =>
  import('@/features/users/pages/users-page').then((m) => ({ default: m.UsersPage })),
);
const RolesPage = lazy(() =>
  import('@/features/roles/pages/roles-page').then((m) => ({ default: m.RolesPage })),
);
const AuditsPage = lazy(() =>
  import('@/features/audits/pages/audits-page').then((m) => ({ default: m.AuditsPage })),
);
const SettingsPage = lazy(() =>
  import('@/features/settings/pages/settings-page').then((m) => ({ default: m.SettingsPage })),
);

const Lazy = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
);

const NotFoundPage = () => (
  <div className="flex h-screen flex-col items-center justify-center gap-2">
    <h1 className="text-4xl font-bold text-primary">404</h1>
    <p className="text-muted-foreground">Page not found</p>
  </div>
);

export const router = createBrowserRouter([
  // Public auth routes
  {
    element: <AuthLayout />,
    errorElement: <RouteErrorFallback />,
    children: [
      { path: '/login', element: <Lazy><LoginPage /></Lazy> },
      { path: '/register', element: <Lazy><RegisterPage /></Lazy> },
      { path: '/forgot-password', element: <Lazy><ForgotPasswordPage /></Lazy> },
      { path: '/reset-password', element: <Lazy><ResetPasswordPage /></Lazy> },
      { path: '/2fa-verify', element: <Lazy><TwoFactorVerifyPage /></Lazy> },
    ],
  },

  // Protected routes
  {
    element: <ProtectedRoute />,
    errorElement: <RouteErrorFallback />,
    children: [
      // Onboarding routes (forced flows)
      {
        element: <OnboardingLayout />,
        children: [
          { path: '/onboarding/2fa-setup', element: <Lazy><Onboarding2faPage /></Lazy> },
          { path: '/onboarding/change-password', element: <Lazy><OnboardingPasswordPage /></Lazy> },
        ],
      },

      // Main app routes (onboarded users only)
      {
        element: <OnboardingGuard />,
        children: [
          {
            element: <AppLayout />,
            children: [
              { index: true, element: <Lazy><DashboardPage /></Lazy> },
              { path: '/todos', element: <Lazy><TodosPage /></Lazy> },
              { path: '/users', element: <Lazy><UsersPage /></Lazy> },
              { path: '/roles', element: <Lazy><RolesPage /></Lazy> },
              { path: '/audits', element: <Lazy><AuditsPage /></Lazy> },
              { path: '/settings', element: <Lazy><SettingsPage /></Lazy> },
            ],
          },
        ],
      },
    ],
  },

  // 404
  { path: '*', element: <NotFoundPage /> },
]);
