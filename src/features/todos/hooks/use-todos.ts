import { useQuery } from '@tanstack/react-query';
import { todoService } from '@/services/todo.service';
import { QUERY_KEYS } from '@/lib/constants';
import type { PaginationQuery } from '@/types';

export const useTodos = (params: PaginationQuery) => {
  return useQuery({
    queryKey: QUERY_KEYS.todos(params),
    queryFn: () => todoService.getAll(params),
  });
};
