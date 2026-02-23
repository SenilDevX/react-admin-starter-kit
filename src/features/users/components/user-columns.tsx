import type { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableHeader } from '@/components/data-table/data-table-header';
import { DataTableRowActions } from '@/components/data-table/data-table-row-actions';
import { StatusBadge } from '@/components/shared/status-badge';
import { formatDateTime } from '@/lib/format';
import type { User } from '@/types';

type UserColumnActions = {
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
};

export const getUserColumns = ({ onEdit, onDelete }: UserColumnActions): ColumnDef<User>[] => [
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
    id: 'name',
    accessorFn: (row) => `${row.firstName ?? ''} ${row.lastName ?? ''}`.trim(),
    header: ({ column }) => <DataTableHeader column={column} title="Name" />,
    cell: ({ row }) => (
      <span className="max-w-50 truncate font-medium">
        {row.original.firstName ?? ''} {row.original.lastName ?? ''}
      </span>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableHeader column={column} title="Email" />,
    cell: ({ row }) => (
      <span className="max-w-62.5 truncate text-muted-foreground">{row.getValue('email')}</span>
    ),
  },
  {
    id: 'role',
    accessorFn: (row) => row.roleId?.name ?? 'No role',
    header: ({ column }) => <DataTableHeader column={column} title="Role" />,
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.original.roleId?.name ?? 'No role'}</span>
    ),
  },
  {
    id: 'twoFactor',
    accessorFn: (row) => row.isTwoFactorEnabled,
    header: '2FA',
    cell: ({ row }) => (
      <StatusBadge
        status={row.original.isTwoFactorEnabled ? 'Enabled' : 'Disabled'}
        variant={row.original.isTwoFactorEnabled ? 'success' : 'default'}
      />
    ),
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
