import { Outlet } from 'react-router';
import { usePermissions } from '@/hooks/use-permissions';
import { ShieldAlert } from 'lucide-react';

type PermissionRouteProps = {
  permission: string;
};

export const PermissionRoute = ({ permission }: PermissionRouteProps) => {
  const { hasPermission } = usePermissions();

  if (!hasPermission(permission)) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 py-20">
        <ShieldAlert className="h-16 w-16 text-muted-foreground/50" />
        <div className="text-center">
          <h2 className="text-lg font-semibold">Access Denied</h2>
          <p className="text-sm text-muted-foreground">
            You don&apos;t have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return <Outlet />;
};
