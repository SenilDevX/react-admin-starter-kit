import type { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { Switch } from '@/components/ui/switch';
import { DataTableHeader } from '@/components/data-table/data-table-header';
import { DataTableRowActions } from '@/components/data-table/data-table-row-actions';
import { formatDateTime } from '@/lib/format';
import type { User } from '@/types';

type UserColumnActions = {
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onToggle2FA: (user: User, enabled: boolean) => void;
};

export const getUserColumns = ({ onEdit, onDelete, onToggle2FA }: UserColumnActions): ColumnDef<User>[] => [
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
    meta: { label: 'Name' },
    cell: ({ row }) => {
      const name = `${row.original.firstName ?? ''} ${row.original.lastName ?? ''}`.trim();
      return <span className="max-w-50 truncate font-medium">{name || '—'}</span>;
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => <DataTableHeader column={column} title="Email" />,
    meta: { label: 'Email' },
    cell: ({ row }) => (
      <span className="max-w-62.5 truncate text-muted-foreground">
        {row.getValue('email') || '—'}
      </span>
    ),
  },
  {
    id: 'role',
    accessorFn: (row) => row.roleId?.name ?? '—',
    header: 'Role',
    meta: { label: 'Role' },
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.original.roleId?.name ?? '—'}</span>
    ),
    enableSorting: false,
  },
  {
    id: 'twoFactor',
    accessorFn: (row) => row.isTwoFactorEnabled,
    header: '2FA',
    meta: { label: '2FA' },
    enableSorting: false,
    cell: ({ row }) => (
      <Switch
        size="sm"
        checked={row.original.isTwoFactorEnabled}
        onCheckedChange={(checked) => onToggle2FA(row.original, checked)}
      />
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableHeader column={column} title="Created" />,
    meta: { label: 'Created' },
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {formatDateTime(row.getValue('createdAt')) || '—'}
      </span>
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
