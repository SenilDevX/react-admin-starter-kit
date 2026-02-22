import { api } from '@/lib/axios';
import type { Permission } from '@/types';

export const permissionService = {
  getAll: () => api.get<unknown, Permission[]>('/permissions'),
};
