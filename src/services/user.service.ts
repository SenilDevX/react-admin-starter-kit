import { api } from '@/lib/axios';
import type { User, CreateUserRequest, UpdateUserRequest, ListUsersQuery, PaginatedData } from '@/types';

export const userService = {
  getAll: (params?: ListUsersQuery) =>
    api.get<unknown, PaginatedData<User>>('/users', { params }),

  getById: (id: string) => api.get<unknown, User>(`/users/${id}`),

  create: (data: CreateUserRequest) => api.post<unknown, User>('/users', data),

  update: (id: string, data: UpdateUserRequest) => api.patch<unknown, User>(`/users/${id}`, data),

  delete: (id: string) => api.delete<unknown, void>(`/users/${id}`),
};
