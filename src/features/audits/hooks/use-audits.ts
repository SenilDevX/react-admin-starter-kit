import { useQuery } from '@tanstack/react-query';
import { auditService } from '@/services/audit.service';
import { QUERY_KEYS } from '@/lib/constants';
import type { ListAuditsQuery } from '@/types';

export const useAudits = (params: ListAuditsQuery) => {
  return useQuery({
    queryKey: QUERY_KEYS.audits(params),
    queryFn: () => auditService.getAll(params),
  });
};
