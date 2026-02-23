import { useState, useMemo, useCallback } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { DataTable } from '@/components/data-table/data-table';
import { useAudits } from '../hooks/use-audits';
import { getAuditColumns } from '../components/audit-columns';
import { AuditTableToolbar } from '../components/audit-table-toolbar';
import { AuditDetailDrawer } from '../components/audit-detail-drawer';
import { usePagination } from '@/hooks/use-pagination';
import { useDebounce } from '@/hooks/use-debounce';
import { exportToCSV, exportToXLSX } from '@/lib/export';
import { formatDateTime, capitalize } from '@/lib/format';
import type { AuditLog, AuditModule, AuditAction } from '@/types';

export const AuditsPage = () => {
  const { page, limit, setPage, setLimit } = usePagination();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [selectedAudit, setSelectedAudit] = useState<AuditLog | null>(null);

  const queryParams = useMemo(
    () => ({
      page,
      limit,
      ...(debouncedSearch && { userName: debouncedSearch }),
      ...(filters.module && { module: filters.module as AuditModule }),
      ...(filters.action && { action: filters.action as AuditAction }),
    }),
    [page, limit, debouncedSearch, filters],
  );

  const { data, isLoading, refetch } = useAudits(queryParams);

  const columns = useMemo(
    () =>
      getAuditColumns({
        onView: (audit) => setSelectedAudit(audit),
      }),
    [],
  );

  const handleFilterChange = useCallback(
    (key: string, value: string) => {
      setFilters((prev) => ({ ...prev, [key]: value }));
      setPage(1);
    },
    [setPage],
  );

  const handleFilterClear = useCallback(() => {
    setFilters({});
    setPage(1);
  }, [setPage]);

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  const prepareExportData = () => {
    if (!data?.items) return [];
    return data.items.map((audit) => ({
      'User Name': audit.userName,
      'Email': audit.userEmail,
      'Role': audit.userRole,
      'Module': capitalize(audit.module),
      'Action': capitalize(audit.action),
      'Record ID': audit.recordId,
      'IP Address': audit.ipAddress,
      'Created': formatDateTime(audit.createdAt),
    }));
  };

  return (
    <div>
      <PageHeader title="Audit Logs" description="Track all system activity." />

      <DataTable
        columns={columns}
        data={data?.items ?? []}
        isLoading={isLoading}
        pagination={
          data
            ? { page: data.page, limit: data.limit, total: data.total, totalPages: data.totalPages }
            : undefined
        }
        onPageChange={setPage}
        onLimitChange={setLimit}
        emptyTitle="No audit logs found"
        emptyDescription="There are no audit logs matching your criteria."
        toolbar={
          <AuditTableToolbar
            search={search}
            onSearchChange={(val) => {
              setSearch(val);
              setPage(1);
            }}
            filters={filters}
            onFilterChange={handleFilterChange}
            onFilterClear={handleFilterClear}
            activeFilterCount={activeFilterCount}
            onExportCSV={() => exportToCSV(prepareExportData(), 'audit-logs')}
            onExportXLSX={() => exportToXLSX(prepareExportData(), 'audit-logs')}
            onRefresh={refetch}
          />
        }
      />

      <AuditDetailDrawer
        open={!!selectedAudit}
        onOpenChange={(open) => !open && setSelectedAudit(null)}
        audit={selectedAudit}
      />
    </div>
  );
};
