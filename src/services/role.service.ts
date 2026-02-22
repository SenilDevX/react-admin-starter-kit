import { api } from '@/lib/axios';
import type { Role, CreateRoleRequest, UpdateRoleRequest, PaginatedData, PaginationQuery } from '@/types';

export const roleService = {
  getAll: (params?: PaginationQuery) =>
    api.get<unknown, PaginatedData<Role>>('/roles', { params }),

  getById: (id: string) => api.get<unknown, Role>(`/roles/${id}`),

  create: (data: CreateRoleRequest) => api.post<unknown, Role>('/roles', data),

  update: (id: string, data: UpdateRoleRequest) => api.patch<unknown, Role>(`/roles/${id}`, data),

  delete: (id: string) => api.delete<unknown, void>(`/roles/${id}`),
};
