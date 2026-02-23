import { lazy } from 'react';
import { createBrowserRouter } from 'react-router';
import { AuthLayout } from '@/components/layout/auth-layout';
import { AppLayout } from '@/components/layout/app-layout';
import { OnboardingLayout } from '@/components/layout/onboarding-layout';
import { ProtectedRoute } from './protected-route';
import { OnboardingGuard } from './onboarding-guard';
import { RouteErrorFallback } from '@/components/shared/route-error-fallback';
import { LazyLoad } from '@/components/shared/lazy-load';
import { NotFound } from '@/components/shared/not-found';

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

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <RouteErrorFallback />,
    children: [
      {
        path: '/login',
        element: (
          <LazyLoad>
            <LoginPage />
          </LazyLoad>
        ),
      },
      {
        path: '/register',
        element: (
          <LazyLoad>
            <RegisterPage />
          </LazyLoad>
        ),
      },
      {
        path: '/forgot-password',
        element: (
          <LazyLoad>
            <ForgotPasswordPage />
          </LazyLoad>
        ),
      },
      {
        path: '/reset-password',
        element: (
          <LazyLoad>
            <ResetPasswordPage />
          </LazyLoad>
        ),
      },
      {
        path: '/2fa-verify',
        element: (
          <LazyLoad>
            <TwoFactorVerifyPage />
          </LazyLoad>
        ),
      },
    ],
  },

  {
    element: <ProtectedRoute />,
    errorElement: <RouteErrorFallback />,
    children: [
      {
        element: <OnboardingLayout />,
        children: [
          {
            path: '/onboarding/2fa-setup',
            element: (
              <LazyLoad>
                <Onboarding2faPage />
              </LazyLoad>
            ),
          },
          {
            path: '/onboarding/change-password',
            element: (
              <LazyLoad>
                <OnboardingPasswordPage />
              </LazyLoad>
            ),
          },
        ],
      },

      {
        element: <OnboardingGuard />,
        children: [
          {
            element: <AppLayout />,
            children: [
              {
                index: true,
                element: (
                  <LazyLoad>
                    <DashboardPage />
                  </LazyLoad>
                ),
              },
              {
                path: '/todos',
                element: (
                  <LazyLoad>
                    <TodosPage />
                  </LazyLoad>
                ),
              },
              {
                path: '/users',
                element: (
                  <LazyLoad>
                    <UsersPage />
                  </LazyLoad>
                ),
              },
              {
                path: '/roles',
                element: (
                  <LazyLoad>
                    <RolesPage />
                  </LazyLoad>
                ),
              },
              {
                path: '/audits',
                element: (
                  <LazyLoad>
                    <AuditsPage />
                  </LazyLoad>
                ),
              },
              {
                path: '/settings',
                element: (
                  <LazyLoad>
                    <SettingsPage />
                  </LazyLoad>
                ),
              },
            ],
          },
        ],
      },
    ],
  },

  { path: '*', element: <NotFound /> },
]);
