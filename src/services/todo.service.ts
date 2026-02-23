import { api } from '@/lib/axios';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import type { Todo, CreateTodoRequest, UpdateTodoRequest, PaginatedData, ListTodosQuery } from '@/types';

export const todoService = {
  getAll: (params?: ListTodosQuery) =>
    api.get<unknown, PaginatedData<Todo>>(API_ENDPOINTS.TODOS, { params }),

  getById: (id: string) => api.get<unknown, Todo>(`${API_ENDPOINTS.TODOS}/${id}`),

  create: (data: CreateTodoRequest) => api.post<unknown, Todo>(API_ENDPOINTS.TODOS, data),

  update: (id: string, data: UpdateTodoRequest) => api.patch<unknown, Todo>(`${API_ENDPOINTS.TODOS}/${id}`, data),

  delete: (id: string) => api.delete<unknown, void>(`${API_ENDPOINTS.TODOS}/${id}`),
};
