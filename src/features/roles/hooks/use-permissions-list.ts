import { useQuery } from '@tanstack/react-query';
import { permissionService } from '@/services/permission.service';
import { QUERY_KEYS } from '@/lib/constants';

export const usePermissionsList = () => {
  return useQuery({
    queryKey: QUERY_KEYS.permissions,
    queryFn: () => permissionService.getAll(),
  });
};
