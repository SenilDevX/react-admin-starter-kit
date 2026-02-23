import { api } from '@/lib/axios';
import { API_ENDPOINTS } from '@/lib/api-endpoints';
import type { AuditLog, ListAuditsQuery, PaginatedData } from '@/types';

export const auditService = {
  getAll: (params?: ListAuditsQuery) =>
    api.get<unknown, PaginatedData<AuditLog>>(API_ENDPOINTS.AUDITS, { params }),
};
