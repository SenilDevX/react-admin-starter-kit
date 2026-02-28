import type { UserProfile } from '@/types';

export const hasPermission = (user: UserProfile | null, permission: string | string[]): boolean => {
  if (!user?.role?.permissions) return false;
  if (Array.isArray(permission)) {
    return permission.some((p) => user.role!.permissions.includes(p));
  }
  return user.role.permissions.includes(permission);
};

export const canAccess = (user: UserProfile | null, module: string, action: string): boolean => {
  return hasPermission(user, `${module}.${action}`);
};
