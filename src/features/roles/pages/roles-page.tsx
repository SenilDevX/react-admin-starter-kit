import { useState, useMemo, useCallback } from 'react';
import type { RowSelectionState } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { DataTable } from '@/components/data-table/data-table';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { DataTableExport } from '@/components/data-table/data-table-export';
import { DataTableBulkActions } from '@/components/data-table/data-table-bulk-actions';
import { ConfirmDialog } from '@/components/shared/confirm-dialog';
import { PermissionGate } from '@/components/shared/permission-gate';
import { Button } from '@/components/ui/button';
import { useRoles } from '../hooks/use-roles';
import { useDeleteRole } from '../hooks/use-role-mutations';
import { getRoleColumns } from '../components/role-columns';
import { RoleCreateDialog } from '../components/role-create-dialog';
import { RoleEditDialog } from '../components/role-edit-dialog';
import { usePagination } from '@/hooks/use-pagination';
import { useDebounce } from '@/hooks/use-debounce';
import { exportToCSV, exportToXLSX } from '@/lib/export';
import { formatDateTime } from '@/lib/format';
import type { Role } from '@/types';

export const RolesPage = () => {
  const { page, limit, setPage, setLimit } = usePagination();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  // Dialog states
  const [createOpen, setCreateOpen] = useState(false);
  const [editRole, setEditRole] = useState<Role | null>(null);
  const [deleteRole, setDeleteRole] = useState<Role | null>(null);

  const { mutate: removeRole, isPending: isDeleting } = useDeleteRole();

  const queryParams = useMemo(
    () => ({
      page,
      limit,
      ...(debouncedSearch && { search: debouncedSearch }),
    }),
    [page, limit, debouncedSearch],
  );

  const { data, isLoading, refetch } = useRoles(queryParams);

  const columns = useMemo(
    () =>
      getRoleColumns({
        onEdit: (role) => setEditRole(role),
        onDelete: (role) => setDeleteRole(role),
      }),
    [],
  );

  const handleDelete = () => {
    if (!deleteRole) return;
    removeRole(deleteRole._id, {
      onSuccess: () => setDeleteRole(null),
    });
  };

  const handleBulkDelete = useCallback(() => {
    const selectedIds = Object.keys(rowSelection);
    if (!data?.items) return;
    const rolesToDelete = data.items.filter(
      (_, index) => selectedIds.includes(String(index)) && !_.isSystem,
    );
    Promise.all(rolesToDelete.map((role) => removeRole(role._id))).then(() => {
      setRowSelection({});
    });
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
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Role
          </Button>
        </PermissionGate>
      </PageHeader>

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
        rowSelection={rowSelection}
        onRowSelectionChange={setRowSelection}
        emptyTitle="No roles found"
        emptyDescription="Get started by creating your first role."
        toolbar={
          <DataTableToolbar
            searchValue={search}
            onSearchChange={(val) => {
              setSearch(val);
              setPage(1);
            }}
            searchPlaceholder="Search roles..."
            onRefresh={refetch}
          >
            <DataTableExport
              onExportCSV={() => exportToCSV(prepareExportData(), 'roles')}
              onExportXLSX={() => exportToXLSX(prepareExportData(), 'roles')}
            />
          </DataTableToolbar>
        }
        bulkActions={
          <DataTableBulkActions
            selectedCount={Object.keys(rowSelection).length}
            onDelete={handleBulkDelete}
            onClear={() => setRowSelection({})}
          />
        }
      />

      <RoleCreateDialog open={createOpen} onOpenChange={setCreateOpen} />
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
