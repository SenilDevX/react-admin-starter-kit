import { api } from '@/lib/axios';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import type { Permission } from '@/types';

export const permissionService = {
  getAll: () => api.get<unknown, Permission[]>(API_ENDPOINTS.PERMISSIONS),
};
