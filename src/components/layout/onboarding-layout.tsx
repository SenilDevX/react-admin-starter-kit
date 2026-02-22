import { Outlet } from 'react-router';

export const OnboardingLayout = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-primary">GPMS Enterprise</h1>
          <p className="mt-1 text-sm text-muted-foreground">Complete your account setup</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
