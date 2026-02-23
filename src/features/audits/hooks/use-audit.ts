import { useQuery } from '@tanstack/react-query';
import { auditService } from '@/services/audit.service';
import { QUERY_KEYS } from '@/lib/constants';

export const useAudit = (id: string | null) => {
  return useQuery({
    queryKey: QUERY_KEYS.audit(id!),
    queryFn: () => auditService.getById(id!),
    enabled: !!id,
  });
};
