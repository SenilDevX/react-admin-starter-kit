import { useMutation, useQueryClient } from '@tanstack/react-query';
import { todoService } from '@/services/todo.service';
import { toast } from 'sonner';
import type { CreateTodoRequest, UpdateTodoRequest } from '@/types';

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateTodoRequest) => todoService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Todo created successfully');
    },
    onError: (error: { message: string }) => {
      toast.error(error.message || 'Failed to create todo');
    },
  });
};

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTodoRequest }) =>
      todoService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Todo updated successfully');
    },
    onError: (error: { message: string }) => {
      toast.error(error.message || 'Failed to update todo');
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => todoService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Todo deleted successfully');
    },
    onError: (error: { message: string }) => {
      toast.error(error.message || 'Failed to delete todo');
    },
  });
};
