import { useState, useMemo, useCallback } from 'react';
import type { RowSelectionState } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { PageHeader } from '@/components/shared/page-header';
import { DataTable } from '@/components/data-table/data-table';
import { DataTableBulkActions } from '@/components/data-table/data-table-bulk-actions';
import { ConfirmDialog } from '@/components/shared/confirm-dialog';
import { PermissionGate } from '@/components/shared/permission-gate';
import { Button } from '@/components/ui/button';
import { useTodos } from '../hooks/use-todos';
import { useDeleteTodo } from '../hooks/use-todo-mutations';
import { getTodoColumns } from '../components/todo-columns';
import { TodoTableToolbar } from '../components/todo-table-toolbar';
import { TodoCreateDialog } from '../components/todo-create-dialog';
import { TodoEditDialog } from '../components/todo-edit-dialog';
import { usePagination } from '@/hooks/use-pagination';
import { useDebounce } from '@/hooks/use-debounce';
import { exportToCSV, exportToXLSX } from '@/lib/export';
import { formatDateTime } from '@/lib/format';
import type { Todo } from '@/types';

export const TodosPage = () => {
  const { page, limit, setPage, setLimit } = usePagination();
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  // Dialog states
  const [createOpen, setCreateOpen] = useState(false);
  const [editTodo, setEditTodo] = useState<Todo | null>(null);
  const [deleteTodo, setDeleteTodo] = useState<Todo | null>(null);

  const { mutate: removeTodo, isPending: isDeleting } = useDeleteTodo();

  const queryParams = useMemo(
    () => ({
      page,
      limit,
      ...(debouncedSearch && { search: debouncedSearch }),
      ...filters,
    }),
    [page, limit, debouncedSearch, filters],
  );

  const { data, isLoading } = useTodos(queryParams);

  const columns = useMemo(
    () =>
      getTodoColumns({
        onEdit: (todo) => setEditTodo(todo),
        onDelete: (todo) => setDeleteTodo(todo),
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

  const handleDelete = () => {
    if (!deleteTodo) return;
    removeTodo(deleteTodo._id, {
      onSuccess: () => setDeleteTodo(null),
    });
  };

  const handleBulkDelete = () => {
    const selectedIds = Object.keys(rowSelection);
    if (!data?.items) return;
    const todosToDelete = data.items.filter((_, index) => selectedIds.includes(String(index)));
    Promise.all(todosToDelete.map((todo) => removeTodo(todo._id))).then(() => {
      setRowSelection({});
    });
  };

  const prepareExportData = () => {
    if (!data?.items) return [];
    return data.items.map((todo) => ({
      Title: todo.title,
      Description: todo.description || '',
      Status: todo.status,
      Created: formatDateTime(todo.createdAt),
    }));
  };

  return (
    <div>
      <PageHeader title="Todos" description="Manage your todo items.">
        <PermissionGate permission="todos.create">
          <Button onClick={() => setCreateOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Todo
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
        emptyTitle="No todos found"
        emptyDescription="Get started by creating your first todo."
        toolbar={
          <TodoTableToolbar
            search={search}
            onSearchChange={(val) => {
              setSearch(val);
              setPage(1);
            }}
            filters={filters}
            onFilterChange={handleFilterChange}
            onFilterClear={handleFilterClear}
            activeFilterCount={activeFilterCount}
            onExportCSV={() => exportToCSV(prepareExportData(), 'todos')}
            onExportXLSX={() => exportToXLSX(prepareExportData(), 'todos')}
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

      <TodoCreateDialog open={createOpen} onOpenChange={setCreateOpen} />
      <TodoEditDialog open={!!editTodo} onOpenChange={(open) => !open && setEditTodo(null)} todo={editTodo} />
      <ConfirmDialog
        open={!!deleteTodo}
        onOpenChange={(open) => !open && setDeleteTodo(null)}
        title="Delete Todo"
        description={`Are you sure you want to delete "${deleteTodo?.title}"? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="destructive"
        onConfirm={handleDelete}
        isLoading={isDeleting}
      />
    </div>
  );
};
