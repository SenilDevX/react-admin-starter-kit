import { useState, useMemo, useCallback } from 'react';
import type { RowSelectionState } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { DataTable } from '@/components/data-table/data-table';
import { DataTableBulkActions } from '@/components/data-table/data-table-bulk-actions';
import { ConfirmDialog } from '@/components/shared/confirm-dialog';
import { PermissionGate } from '@/components/shared/permission-gate';
import { Button } from '@/components/ui/button';
import { useRoles } from '../hooks/use-roles';
import { useDeleteRole } from '../hooks/use-role-mutations';
import { getRoleColumns } from '../components/role-columns';
import { RoleTableToolbar } from '../components/role-table-toolbar';
import { useDialogStore, DIALOG_KEY } from '@/stores/dialog-store';
import { RoleEditDialog } from '../components/role-edit-dialog';
import { usePagination } from '@/hooks/use-pagination';
import { useDebounce } from '@/hooks/use-debounce';
import { useSorting } from '@/hooks/use-sorting';
import { exportToCSV, exportToXLSX } from '@/lib/export';
import { formatDateTime } from '@/lib/format';
import type { Role } from '@/types';

export const RolesPage = () => {
  const { page, limit, setPage, setLimit } = usePagination();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const { sorting, setSorting, sortBy, sortOrder } = useSorting();

  const { openDialog } = useDialogStore();
  const [editRole, setEditRole] = useState<Role | null>(null);
  const [deleteRole, setDeleteRole] = useState<Role | null>(null);

  const { mutate: removeRole, isPending: isDeleting } = useDeleteRole();

  const queryParams = useMemo(
    () => ({
      page,
      limit,
      ...(debouncedSearch && { s: debouncedSearch }),
      ...(filters.isActive && { isActive: filters.isActive }),
      ...(sortBy && { sortBy, sortOrder }),
    }),
    [page, limit, debouncedSearch, filters, sortBy, sortOrder],
  );

  const { data, isLoading, isFetching, refetch } = useRoles(queryParams);

  const columns = useMemo(
    () =>
      getRoleColumns({
        onEdit: setEditRole,
        onDelete: setDeleteRole,
      }),
    [setEditRole, setDeleteRole],
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

  const handleDelete = () => {
    if (!deleteRole) return;
    removeRole(deleteRole._id, {
      onSuccess: () => setDeleteRole(null),
    });
  };

  const handleBulkDelete = useCallback(() => {
    const selectedIds = Object.keys(rowSelection);
    if (selectedIds.length === 0 || !data?.items) return;
    const systemIds = new Set(data.items.filter((r) => r.isSystem).map((r) => r._id));
    const idsToDelete = selectedIds.filter((id) => !systemIds.has(id));
    if (idsToDelete.length === 0) return;
    Promise.all(idsToDelete.map((id) => removeRole(id)))
      .then(() => setRowSelection({}))
      .catch(() => {});
  }, [rowSelection, data, removeRole]);

  const prepareExportData = useCallback(() => {
    if (!data?.items) return [];
    return data.items.map((role) => ({
      Name: role.name,
      Description: role.description || '',
      Permissions: role.permissions.length,
      '2FA Required': role.requiresTwoFactor ? 'Yes' : 'No',
      Status: role.isActive ? 'Active' : 'Inactive',
      Type: role.isSystem ? 'System' : 'Custom',
      Created: formatDateTime(role.createdAt),
    }));
  }, [data]);

  return (
    <div>
      <PageHeader title="Roles" description="Manage roles and permissions.">
        <PermissionGate permission="roles.create">
          <Button onClick={() => openDialog(DIALOG_KEY.CREATE_ROLE)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Role
          </Button>
        </PermissionGate>
      </PageHeader>

      <DataTable
        columns={columns}
        data={data?.items ?? []}
        getRowId={(row) => row._id}
        isLoading={isLoading}
        pagination={
          data
            ? { page: data.page, limit: data.limit, total: data.total, totalPages: data.totalPages }
            : undefined
        }
        onPageChange={setPage}
        onLimitChange={setLimit}
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        sorting={sorting}
        onSortingChange={setSorting}
        emptyTitle="No roles found"
        emptyDescription="Get started by creating your first role."
        hasActiveFilters={!!debouncedSearch || activeFilterCount > 0}
        toolbar={(columnCustomizer) => (
          <RoleTableToolbar
            search={search}
            onSearchChange={(val) => {
              setSearch(val);
              setPage(1);
            }}
            filters={filters}
            onFilterChange={handleFilterChange}
            onFilterClear={handleFilterClear}
            activeFilterCount={activeFilterCount}
            onExportCSV={() => exportToCSV(prepareExportData(), 'roles')}
            onExportXLSX={() => exportToXLSX(prepareExportData(), 'roles')}
            onRefresh={refetch}
            isRefreshing={isFetching}
            columnCustomizer={columnCustomizer}
          />
        )}
        bulkActions={
          <DataTableBulkActions
            selectedCount={Object.keys(rowSelection).length}
            onDelete={handleBulkDelete}
            onClear={() => setRowSelection({})}
          />
        }
      />

      <RoleEditDialog
        open={!!editRole}
        onOpenChange={(open) => !open && setEditRole(null)}
        role={editRole}
      />
      <ConfirmDialog
        open={!!deleteRole}
        onOpenChange={(open) => !open && setDeleteRole(null)}
        title="Delete Role"
        description={`Are you sure you want to delete "${deleteRole?.name}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </div>
  );
};
