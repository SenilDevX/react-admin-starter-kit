import type { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableHeader } from '@/components/data-table/data-table-header';
import { DataTableRowActions } from '@/components/data-table/data-table-row-actions';
import { TodoStatusBadge } from './todo-status-badge';
import { formatDateTime } from '@/lib/format';
import type { Todo } from '@/types';

type TodoColumnActions = {
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
};

export const getTodoColumns = ({ onEdit, onDelete }: TodoColumnActions): ColumnDef<Todo>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'title',
    header: ({ column }) => <DataTableHeader column={column} title="Title" />,
    cell: ({ row }) => (
      <span className="max-w-75 truncate font-medium">{row.getValue('title')}</span>
    ),
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => (
      <span className="max-w-100 truncate text-muted-foreground">
        {row.getValue('description') || '—'}
      </span>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => <DataTableHeader column={column} title="Status" />,
    cell: ({ row }) => <TodoStatusBadge status={row.getValue('status')} />,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableHeader column={column} title="Created" />,
    cell: ({ row }) => (
      <span className="text-muted-foreground">{formatDateTime(row.getValue('createdAt'))}</span>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <div className="flex justify-end">
        <DataTableRowActions
          onEdit={() => onEdit(row.original)}
          onDelete={() => onDelete(row.original)}
        />
      </div>
    ),
  },
];
