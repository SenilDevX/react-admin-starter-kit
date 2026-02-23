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
import { UserCreateDialog } from '../components/user-create-dialog';
import { UserEditDialog } from '../components/user-edit-dialog';
import { usePagination } from '@/hooks/use-pagination';
import { useDebounce } from '@/hooks/use-debounce';
import { exportToCSV, exportToXLSX } from '@/lib/export';
import { formatDateTime } from '@/lib/format';
import type { User } from '@/types';

export const UsersPage = () => {
  const { page, limit, setPage, setLimit } = usePagination();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  // Dialog states
  const [createOpen, setCreateOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [deleteUser, setDeleteUser] = useState<User | null>(null);

  const { mutate: removeUser, isPending: isDeleting } = useDeleteUser();
  const { mutate: updateUser } = useUpdateUser();

  const queryParams = useMemo(
    () => ({
      page,
      limit,
      ...(debouncedSearch && { search: debouncedSearch }),
      ...filters,
    }),
    [page, limit, debouncedSearch, filters],
  );

  const { data, isLoading, refetch } = useUsers(queryParams);

  const handleToggle2FA = useCallback(
    (user: User, enabled: boolean) => {
      updateUser({ id: user._id, data: { twoFactorEnabled: enabled } });
    },
    [updateUser],
  );

  const columns = useMemo(
    () =>
      getUserColumns({
        onEdit: (user) => setEditUser(user),
        onDelete: (user) => setDeleteUser(user),
        onToggle2FA: handleToggle2FA,
      }),
    [handleToggle2FA],
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
    if (!data?.items) return;
    const usersToDelete = data.items.filter((_, index) => selectedIds.includes(String(index)));
    Promise.all(usersToDelete.map((user) => removeUser(user._id))).then(() => {
      setRowSelection({});
    });
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
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add User
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
        emptyTitle="No users found"
        emptyDescription="Get started by creating your first user."
        toolbar={
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
          />
        }
        bulkActions={
          <DataTableBulkActions
            selectedCount={Object.keys(rowSelection).length}
            onDelete={handleBulkDelete}
            onClear={() => setRowSelection({})}
          />
        }
      />

      <UserCreateDialog open={createOpen} onOpenChange={setCreateOpen} />
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
