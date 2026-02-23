import { useQuery } from '@tanstack/react-query';
import { todoService } from '@/services/todo.service';
import { QUERY_KEYS } from '@/lib/constants';
import type { ListTodosQuery } from '@/types';

export const useTodos = (params: ListTodosQuery) => {
  return useQuery({
    queryKey: QUERY_KEYS.todos(params),
    queryFn: () => todoService.getAll(params),
  });
};
