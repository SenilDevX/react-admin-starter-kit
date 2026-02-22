import { useCallback } from 'react';
import { useAuth } from './use-auth';
import { hasPermission, canAccess } from '@/lib/permissions';

export const usePermissions = () => {
  const { user } = useAuth();

  const check = useCallback(
    (permission: string) => hasPermission(user, permission),
    [user],
  );

  const checkAccess = useCallback(
    (module: string, action: string) => canAccess(user, module, action),
    [user],
  );

  return { hasPermission: check, canAccess: checkAccess };
};
