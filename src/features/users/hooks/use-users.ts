import { useQuery } from '@tanstack/react-query';
import { userService } from '@/services/user.service';
import { QUERY_KEYS } from '@/lib/constants';
import type { ListUsersQuery } from '@/types';

export const useUsers = (params: ListUsersQuery) => {
  return useQuery({
    queryKey: QUERY_KEYS.users(params),
    queryFn: () => userService.getAll(params),
  });
};
