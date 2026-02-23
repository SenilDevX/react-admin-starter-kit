import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { DataTableFilter, type FilterField } from '@/components/data-table/data-table-filter';
import { DataTableExport } from '@/components/data-table/data-table-export';
import { TODO_STATUS } from '@/types';

const statusFilterFields: FilterField[] = [
  {
    key: 'status',
    label: 'Status',
    options: [
      { label: 'Pending', value: TODO_STATUS.PENDING },
      { label: 'Completed', value: TODO_STATUS.COMPLETED },
    ],
  },
];

type TodoTableToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  filters: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
  onFilterClear: () => void;
  activeFilterCount: number;
  onExportCSV: () => void;
  onExportXLSX: () => void;
  onRefresh?: () => void;
  isRefreshing?: boolean;
  columnCustomizer?: React.ReactNode;
};

export const TodoTableToolbar = ({
  search,
  onSearchChange,
  filters,
  onFilterChange,
  onFilterClear,
  activeFilterCount,
  onExportCSV,
  onExportXLSX,
  onRefresh,
  isRefreshing,
  columnCustomizer,
}: TodoTableToolbarProps) => {
  return (
    <DataTableToolbar
      searchValue={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search todos..."
      onRefresh={onRefresh}
      isRefreshing={isRefreshing}
      columnCustomizer={columnCustomizer}
    >
      <DataTableFilter
        fields={statusFilterFields}
        values={filters}
        onChange={onFilterChange}
        onClear={onFilterClear}
        activeCount={activeFilterCount}
      />
      <DataTableExport onExportCSV={onExportCSV} onExportXLSX={onExportXLSX} />
    </DataTableToolbar>
  );
};
