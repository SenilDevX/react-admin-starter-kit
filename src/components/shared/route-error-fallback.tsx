import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const RouteErrorFallback = () => {
  const error = useRouteError();
  const navigate = useNavigate();

  const message = isRouteErrorResponse(error)
    ? `${error.status} — ${error.statusText}`
    : error instanceof Error
      ? error.message
      : 'An unexpected error occurred';

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <AlertTriangle className="h-12 w-12 text-destructive/50" />
      <div className="text-center">
        <h3 className="text-sm font-medium">Something went wrong</h3>
        <p className="mt-1 max-w-md text-sm text-muted-foreground">{message}</p>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={() => navigate(0)}>
          Try again
        </Button>
        <Button variant="outline" size="sm" onClick={() => navigate('/')}>
          Go to dashboard
        </Button>
      </div>
    </div>
  );
};
