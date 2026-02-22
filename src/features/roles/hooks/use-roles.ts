import { useQuery } from '@tanstack/react-query';
import { roleService } from '@/services/role.service';
import { QUERY_KEYS } from '@/lib/constants';
import type { PaginationQuery } from '@/types';

export const useRoles = (params: PaginationQuery) => {
  return useQuery({
    queryKey: QUERY_KEYS.roles(params),
    queryFn: () => roleService.getAll(params),
  });
};
