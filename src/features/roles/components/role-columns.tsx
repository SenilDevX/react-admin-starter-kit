import type { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '@/components/ui/checkbox';
import { DataTableHeader } from '@/components/data-table/data-table-header';
import { DataTableRowActions } from '@/components/data-table/data-table-row-actions';
import { StatusBadge } from '@/components/shared/status-badge';
import { formatDateTime } from '@/lib/format';
import type { Role } from '@/types';

type RoleColumnActions = {
  onEdit: (role: Role) => void;
  onDelete: (role: Role) => void;
};

export const getRoleColumns = ({ onEdit, onDelete }: RoleColumnActions): ColumnDef<Role>[] => [
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
    accessorKey: 'name',
    header: ({ column }) => <DataTableHeader column={column} title="Name" />,
    meta: { label: 'Name' },
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue('name')}</span>
    ),
  },
  {
    accessorKey: 'description',
    header: 'Description',
    meta: { label: 'Description' },
    cell: ({ row }) => (
      <span className="max-w-75 truncate text-muted-foreground">
        {row.getValue('description') || '\u2014'}
      </span>
    ),
  },
  {
    accessorKey: 'permissions',
    header: 'Permissions',
    meta: { label: 'Permissions' },
    cell: ({ row }) => {
      const permissions = row.getValue('permissions') as string[];
      return (
        <span className="text-muted-foreground">
          {permissions.length} {permissions.length === 1 ? 'permission' : 'permissions'}
        </span>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'requiresTwoFactor',
    header: '2FA Required',
    meta: { label: '2FA Required' },
    cell: ({ row }) => {
      const requires = row.getValue('requiresTwoFactor') as boolean;
      return (
        <StatusBadge
          status={requires ? 'Yes' : 'No'}
          variant={requires ? 'info' : 'default'}
        />
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'isActive',
    header: 'Status',
    meta: { label: 'Status' },
    cell: ({ row }) => {
      const isActive = row.getValue('isActive') as boolean;
      return (
        <StatusBadge
          status={isActive ? 'Active' : 'Inactive'}
          variant={isActive ? 'success' : 'destructive'}
        />
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'isSystem',
    header: 'Type',
    meta: { label: 'Type' },
    cell: ({ row }) => {
      const isSystem = row.getValue('isSystem') as boolean;
      return (
        <StatusBadge
          status={isSystem ? 'System' : 'Custom'}
          variant={isSystem ? 'warning' : 'default'}
        />
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableHeader column={column} title="Created" />,
    meta: { label: 'Created' },
    cell: ({ row }) => (
      <span className="text-muted-foreground">{formatDateTime(row.getValue('createdAt'))}</span>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const role = row.original;
      if (role.isSystem) return null;
      return (
        <div className="flex justify-end">
          <DataTableRowActions
            onEdit={role.isSystem ? undefined : () => onEdit(role)}
            onDelete={role.isSystem ? undefined : () => onDelete(role)}
          />
        </div>
      );
    },
  },
];
