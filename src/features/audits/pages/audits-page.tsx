import { useState, useMemo, useCallback } from 'react';
import { PageHeader } from '@/components/shared/page-header';
import { DataTable } from '@/components/data-table/data-table';
import { useAudits } from '../hooks/use-audits';
import { auditColumns } from '../components/audit-columns';
import { AuditTableToolbar } from '../components/audit-table-toolbar';
import { AuditDetailDrawer } from '../components/audit-detail-drawer';
import { usePagination } from '@/hooks/use-pagination';
import { useDebounce } from '@/hooks/use-debounce';
import { useSorting } from '@/hooks/use-sorting';
import { exportToCSV, exportToXLSX } from '@/lib/export';
import { formatDateTime, capitalize } from '@/lib/format';
import type { AuditModule, AuditAction } from '@/types';

export const AuditsPage = () => {
  const { page, limit, setPage, setLimit } = usePagination();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [selectedAuditId, setSelectedAuditId] = useState<string | null>(null);
  const { sorting, setSorting, sortBy, sortOrder } = useSorting();

  const queryParams = useMemo(
    () => ({
      page,
      limit,
      ...(debouncedSearch && { s: debouncedSearch }),
      ...(filters.module && { module: filters.module as AuditModule }),
      ...(filters.action && { action: filters.action as AuditAction }),
      ...(filters.fromDate && { fromDate: filters.fromDate }),
      ...(filters.toDate && { toDate: filters.toDate }),
      ...(sortBy && { sortBy, sortOrder }),
    }),
    [page, limit, debouncedSearch, filters, sortBy, sortOrder],
  );

  const { data, isLoading, isFetching, refetch } = useAudits(queryParams);

  const handleRowClick = useCallback((audit: { _id: string }) => {
    setSelectedAuditId(audit._id);
  }, []);

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

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.module) count++;
    if (filters.action) count++;
    if (filters.fromDate || filters.toDate) count++;
    return count;
  }, [filters]);

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
        columns={auditColumns}
        data={data?.items ?? []}
        onRowClick={handleRowClick}
        isLoading={isLoading}
        pagination={
          data
            ? { page: data.page, limit: data.limit, total: data.total, totalPages: data.totalPages }
            : undefined
        }
        onPageChange={setPage}
        onLimitChange={setLimit}
        sorting={sorting}
        onSortingChange={setSorting}
        emptyTitle="No audit logs found"
        emptyDescription="There are no audit logs matching your criteria."
        hasActiveFilters={!!debouncedSearch || activeFilterCount > 0}
        toolbar={(columnCustomizer) => (
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
            isRefreshing={isFetching}
            columnCustomizer={columnCustomizer}
          />
        )}
      />

      <AuditDetailDrawer
        open={!!selectedAuditId}
        onOpenChange={(open) => !open && setSelectedAuditId(null)}
        auditId={selectedAuditId}
      />
    </div>
  );
};
