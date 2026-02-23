import { api } from '@/lib/axios';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import type { User, CreateUserRequest, UpdateUserRequest, ListUsersQuery, PaginatedData } from '@/types';

export const userService = {
  getAll: (params?: ListUsersQuery) =>
    api.get<unknown, PaginatedData<User>>(API_ENDPOINTS.USERS, { params }),

  getById: (id: string) => api.get<unknown, User>(`${API_ENDPOINTS.USERS}/${id}`),

  create: (data: CreateUserRequest) => api.post<unknown, User>(API_ENDPOINTS.USERS, data),

  update: (id: string, data: UpdateUserRequest) => api.patch<unknown, User>(`${API_ENDPOINTS.USERS}/${id}`, data),

  delete: (id: string) => api.delete<unknown, void>(`${API_ENDPOINTS.USERS}/${id}`),
};
