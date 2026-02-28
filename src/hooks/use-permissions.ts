import { useCallback } from 'react';
import { useAuthStore } from '@/stores/auth-store';
import { hasPermission, canAccess } from '@/lib/permissions';

export const usePermissions = () => {
  const { user } = useAuthStore();

  const check = useCallback(
    (permission: string | string[]) => hasPermission(user, permission),
    [user],
  );

  const checkAccess = useCallback(
    (module: string, action: string) => canAccess(user, module, action),
    [user],
  );

  return { hasPermission: check, canAccess: checkAccess };
};
