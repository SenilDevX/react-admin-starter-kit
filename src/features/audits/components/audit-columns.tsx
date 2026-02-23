import type { ColumnDef } from '@tanstack/react-table';
import { DataTableHeader } from '@/components/data-table/data-table-header';
import { StatusBadge } from '@/components/shared/status-badge';
import { formatDateTime, capitalize } from '@/lib/format';
import type { AuditLog, AuditAction } from '@/types';

const actionVariantMap: Record<AuditAction, { variant: 'info' | 'warning' | 'destructive'; label: string }> = {
  created: { variant: 'info', label: 'Created' },
  updated: { variant: 'warning', label: 'Updated' },
  deleted: { variant: 'destructive', label: 'Deleted' },
};

export const auditColumns: ColumnDef<AuditLog>[] = [
  {
    accessorKey: 'userName',
    header: ({ column }) => <DataTableHeader column={column} title="User Name" />,
    cell: ({ row }) => (
      <span className="max-w-50 truncate font-medium">{row.getValue('userName') || '-'}</span>
    ),
  },
  {
    accessorKey: 'userEmail',
    header: 'Email',
    cell: ({ row }) => (
      <span className="max-w-62.5 truncate text-muted-foreground">
        {row.getValue('userEmail') || '-'}
      </span>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'module',
    header: 'Module',
    cell: ({ row }) => (
      <StatusBadge status={capitalize(row.getValue('module'))} variant="default" />
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => {
      const action = row.getValue('action') as AuditAction;
      const { variant, label } = actionVariantMap[action] ?? { variant: 'default' as const, label: capitalize(action) };
      return <StatusBadge status={label} variant={variant} />;
    },
    enableSorting: false,
  },
  {
    accessorKey: 'ipAddress',
    header: 'IP Address',
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue('ipAddress') || '-'}</span>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <DataTableHeader column={column} title="Created" />,
    cell: ({ row }) => (
      <span className="text-muted-foreground">{formatDateTime(row.getValue('createdAt'))}</span>
    ),
  },
];
