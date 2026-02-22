import { api } from '@/lib/axios';
import type { Todo, CreateTodoRequest, UpdateTodoRequest, PaginatedData, PaginationQuery } from '@/types';

export const todoService = {
  getAll: (params?: PaginationQuery) =>
    api.get<unknown, PaginatedData<Todo>>('/todos', { params }),

  getById: (id: string) => api.get<unknown, Todo>(`/todos/${id}`),

  create: (data: CreateTodoRequest) => api.post<unknown, Todo>('/todos', data),

  update: (id: string, data: UpdateTodoRequest) => api.patch<unknown, Todo>(`/todos/${id}`, data),

  delete: (id: string) => api.delete<unknown, void>(`/todos/${id}`),
};
