import { api } from '@/lib/axios';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import type { Role, CreateRoleRequest, UpdateRoleRequest, PaginatedData, ListRolesQuery } from '@/types';

export const roleService = {
  getAll: (params?: ListRolesQuery) =>
    api.get<unknown, PaginatedData<Role>>(API_ENDPOINTS.ROLES, { params }),

  getById: (id: string) => api.get<unknown, Role>(`${API_ENDPOINTS.ROLES}/${id}`),

  create: (data: CreateRoleRequest) => api.post<unknown, Role>(API_ENDPOINTS.ROLES, data),

  update: (id: string, data: UpdateRoleRequest) => api.patch<unknown, Role>(`${API_ENDPOINTS.ROLES}/${id}`, data),

  delete: (id: string) => api.delete<unknown, void>(`${API_ENDPOINTS.ROLES}/${id}`),
};
