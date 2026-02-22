import { api } from '@/lib/axios';
import type { AuditLog, ListAuditsQuery, PaginatedData } from '@/types';

export const auditService = {
  getAll: (params?: ListAuditsQuery) =>
    api.get<unknown, PaginatedData<AuditLog>>('/audits', { params }),
};
