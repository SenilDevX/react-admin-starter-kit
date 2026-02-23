import { useState, useMemo, useCallback } from 'react';
import type { RowSelectionState } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { DataTable } from '@/components/data-table/data-table';
import { DataTableBulkActions } from '@/components/data-table/data-table-bulk-actions';
import { ConfirmDialog } from '@/components/shared/confirm-dialog';
import { PermissionGate } from '@/components/shared/permission-gate';
import { Button } from '@/components/ui/button';
import { useUsers } from '../hooks/use-users';
import { useDeleteUser, useUpdateUser } from '../hooks/use-user-mutations';
import { getUserColumns } from '../components/user-columns';
import { UserTableToolbar } from '../components/user-table-toolbar';
import { useDialogStore, DIALOG_KEY } from '@/stores/dialog-store';
import { UserEditDialog } from '../components/user-edit-dialog';
import { usePagination } from '@/hooks/use-pagination';
import { useDebounce } from '@/hooks/use-debounce';
import { useSorting } from '@/hooks/use-sorting';
import { exportToCSV, exportToXLSX } from '@/lib/export';
import { formatDateTime } from '@/lib/format';
import type { User } from '@/types';

export const UsersPage = () => {
  const { page, limit, setPage, setLimit } = usePagination();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const { sorting, setSorting, sortBy, sortOrder } = useSorting();

  const { openDialog } = useDialogStore();
  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  const { mutate: removeUser, isPending: isDeleting } = useDeleteUser();
  const { mutate: updateUser } = useUpdateUser();

  const queryParams = useMemo(() => {
    const mappedSortBy = sortBy === 'name' ? 'firstName' : sortBy;
    return {
      page,
      limit,
      ...(debouncedSearch && { s: debouncedSearch }),
      ...(filters.roleId && { roleId: filters.roleId }),
      ...(mappedSortBy && { sortBy: mappedSortBy, sortOrder }),
    };
  }, [page, limit, debouncedSearch, filters, sortBy, sortOrder]);

  const { data, isLoading, isFetching, refetch } = useUsers(queryParams);

  const handleToggle2FA = useCallback(
    (user: User, enabled: boolean) => {
      updateUser({ id: user._id, data: { twoFactorEnabled: enabled } });
    },
    [updateUser],
  );

  const columns = useMemo(
    () =>
      getUserColumns({
        onEdit: setEditUser,
        onDelete: setDeleteUser,
        onToggle2FA: handleToggle2FA,
      }),
    [setEditUser, setDeleteUser, handleToggle2FA],
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
    if (!deleteUser) return;
    removeUser(deleteUser._id, {
      onSuccess: () => setDeleteUser(null),
    });
  };

  const handleBulkDelete = () => {
    const selectedIds = Object.keys(rowSelection);
    if (selectedIds.length === 0) return;
    Promise.all(selectedIds.map((id) => removeUser(id)))
      .then(() => setRowSelection({}))
      .catch(() => {});
  };

  const prepareExportData = () => {
    if (!data?.items) return [];
    return data.items.map((user) => ({
      Name: `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim(),
      Email: user.email,
      Role: user.roleId?.name ?? 'No role',
      '2FA': user.isTwoFactorEnabled ? 'Enabled' : 'Disabled',
      Created: formatDateTime(user.createdAt),
    }));
  };

  return (
    <div>
      <PageHeader title="Users" description="Manage user accounts.">
        <PermissionGate permission="users.create">
          <Button onClick={() => openDialog(DIALOG_KEY.CREATE_USER)}>
            <Plus className="mr-2 h-4 w-4" />
            Add User
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
        emptyTitle="No users found"
        emptyDescription="Get started by creating your first user."
        hasActiveFilters={!!debouncedSearch || activeFilterCount > 0}
        toolbar={(columnCustomizer) => (
          <UserTableToolbar
            search={search}
            onSearchChange={(val) => {
              setSearch(val);
              setPage(1);
            }}
            filters={filters}
            onFilterChange={handleFilterChange}
            onFilterClear={handleFilterClear}
            activeFilterCount={activeFilterCount}
            onExportCSV={() => exportToCSV(prepareExportData(), 'users')}
            onExportXLSX={() => exportToXLSX(prepareExportData(), 'users')}
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

      <UserEditDialog open={!!editUser} onOpenChange={(open) => !open && setEditUser(null)} user={editUser} />
      <ConfirmDialog
        open={!!deleteUser}
        onOpenChange={(open) => !open && setDeleteUser(null)}
        title="Delete User"
        description={`Are you sure you want to delete "${deleteUser?.firstName ?? ''} ${deleteUser?.lastName ?? ''}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </div>
  );
};
