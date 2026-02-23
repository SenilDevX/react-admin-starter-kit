import { createBrowserRouter } from 'react-router';
import { AuthLayout } from '@/components/layout/auth-layout';
import { AppLayout } from '@/components/layout/app-layout';
import { OnboardingLayout } from '@/components/layout/onboarding-layout';
import { AuthGuard } from '@/components/guards/auth-guard';
import { OnboardingGuard } from '@/components/guards/onboarding-guard';
import { PermissionGuard } from '@/components/guards/permission-guard';
import { RouteErrorFallback } from '@/components/shared/route-error-fallback';
import { LazyLoad } from '@/components/shared/lazy-load';
import { NotFound } from '@/components/shared/not-found';
import { authRoutes } from './auth-routes';
import { onboardingRoutes, appRoutes } from './protected-routes';

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <RouteErrorFallback />,
    children: authRoutes.map((route) => ({
      path: route.path,
      element: (
        <LazyLoad>
          <route.element />
        </LazyLoad>
      ),
    })),
  },

  {
    element: <AuthGuard />,
    errorElement: <RouteErrorFallback />,
    children: [
      {
        element: <OnboardingLayout />,
        children: onboardingRoutes.map((route) => ({
          path: route.path,
          element: (
            <LazyLoad>
              <route.element />
            </LazyLoad>
          ),
        })),
      },

      {
        element: <OnboardingGuard />,
        children: [
          {
            element: <AppLayout />,
            children: appRoutes.map((route) => ({
              ...(route.index ? { index: true } : { path: route.path }),
              element: route.permission ? (
                <PermissionGuard permission={route.permission}>
                  <LazyLoad>
                    <route.element />
                  </LazyLoad>
                </PermissionGuard>
              ) : (
                <LazyLoad>
                  <route.element />
                </LazyLoad>
              ),
            })),
          },
        ],
      },
    ],
  },

  { path: '*', element: <NotFound /> },
]);
