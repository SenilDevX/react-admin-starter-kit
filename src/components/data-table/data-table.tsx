import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type SortingState,
  type RowSelectionState,
  type VisibilityState,
} from '@tanstack/react-table';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DataTablePagination } from './data-table-pagination';
import { EmptyState } from '@/components/shared/empty-state';
import { TableSkeleton } from '@/components/shared/loading-skeleton';
import type { ReactNode } from 'react';

type PaginationData = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination?: PaginationData;
  onPageChange?: (page: number) => void;
  onLimitChange?: (limit: number) => void;
  isLoading?: boolean;
  toolbar?: ReactNode;
  bulkActions?: ReactNode;
  rowSelection?: RowSelectionState;
  onRowSelectionChange?: (selection: RowSelectionState) => void;
  columnVisibility?: VisibilityState;
  onColumnVisibilityChange?: (visibility: VisibilityState) => void;
  emptyTitle?: string;
  emptyDescription?: string;
};

export const DataTable = <TData, TValue>({
  columns,
  data,
  pagination,
  onPageChange,
  onLimitChange,
  isLoading,
  toolbar,
  bulkActions,
  rowSelection: controlledRowSelection,
  onRowSelectionChange,
  columnVisibility: controlledColumnVisibility,
  onColumnVisibilityChange,
  emptyTitle,
  emptyDescription,
}: DataTableProps<TData, TValue>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [internalRowSelection, setInternalRowSelection] = useState<RowSelectionState>({});
  const [internalColumnVisibility, setInternalColumnVisibility] = useState<VisibilityState>({});

  const rowSelection = controlledRowSelection ?? internalRowSelection;
  const columnVisibility = controlledColumnVisibility ?? internalColumnVisibility;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: onRowSelectionChange
      ? (updater) => {
          const newSelection = typeof updater === 'function' ? updater(rowSelection) : updater;
          onRowSelectionChange(newSelection);
        }
      : setInternalRowSelection,
    onColumnVisibilityChange: onColumnVisibilityChange
      ? (updater) => {
          const newVisibility =
            typeof updater === 'function' ? updater(columnVisibility) : updater;
          onColumnVisibilityChange(newVisibility);
        }
      : setInternalColumnVisibility,
    state: {
      sorting,
      rowSelection,
      columnVisibility,
    },
    manualPagination: true,
  });

  const selectedCount = Object.keys(rowSelection).length;

  return (
    <div>
      {toolbar}

      {selectedCount > 0 && bulkActions}

      <div className="rounded-md border">
        {isLoading ? (
          <div className="p-4">
            <TableSkeleton />
          </div>
        ) : data.length === 0 ? (
          <EmptyState title={emptyTitle} description={emptyDescription} />
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {pagination && onPageChange && onLimitChange && (
        <DataTablePagination
          page={pagination.page}
          totalPages={pagination.totalPages}
          total={pagination.total}
          limit={pagination.limit}
          onPageChange={onPageChange}
          onLimitChange={onLimitChange}
          selectedCount={selectedCount}
        />
      )}
    </div>
  );
};
