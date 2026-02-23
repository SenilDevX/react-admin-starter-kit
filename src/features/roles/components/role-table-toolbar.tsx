import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { DataTableFilter, type FilterField } from '@/components/data-table/data-table-filter';
import { DataTableExport } from '@/components/data-table/data-table-export';

const roleFilterFields: FilterField[] = [
  {
    key: 'isActive',
    label: 'Status',
    options: [
      { label: 'Active', value: 'true' },
      { label: 'Inactive', value: 'false' },
    ],
  },
];

type RoleTableToolbarProps = {
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

export const RoleTableToolbar = ({
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
}: RoleTableToolbarProps) => {
  return (
    <DataTableToolbar
      searchValue={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search roles..."
      onRefresh={onRefresh}
      isRefreshing={isRefreshing}
      columnCustomizer={columnCustomizer}
    >
      <DataTableFilter
        fields={roleFilterFields}
        values={filters}
        onChange={onFilterChange}
        onClear={onFilterClear}
        activeCount={activeFilterCount}
      />
      <DataTableExport onExportCSV={onExportCSV} onExportXLSX={onExportXLSX} />
    </DataTableToolbar>
  );
};
