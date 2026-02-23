import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { DataTableFilter, type FilterField } from '@/components/data-table/data-table-filter';
import { DataTableExport } from '@/components/data-table/data-table-export';
import { AUDIT_MODULE, AUDIT_ACTION } from '@/types';
import { capitalize } from '@/lib/format';

const auditFilterFields: FilterField[] = [
  {
    key: 'module',
    label: 'Module',
    options: Object.values(AUDIT_MODULE).map((value) => ({
      label: capitalize(value),
      value,
    })),
  },
  {
    key: 'action',
    label: 'Action',
    options: Object.values(AUDIT_ACTION).map((value) => ({
      label: capitalize(value),
      value,
    })),
  },
];

type AuditTableToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  filters: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
  onFilterClear: () => void;
  activeFilterCount: number;
  onExportCSV: () => void;
  onExportXLSX: () => void;
  onRefresh?: () => void;
};

export const AuditTableToolbar = ({
  search,
  onSearchChange,
  filters,
  onFilterChange,
  onFilterClear,
  activeFilterCount,
  onExportCSV,
  onExportXLSX,
  onRefresh,
}: AuditTableToolbarProps) => {
  return (
    <DataTableToolbar
      searchValue={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search by user name..."
      onRefresh={onRefresh}
    >
      <DataTableFilter
        fields={auditFilterFields}
        values={filters}
        onChange={onFilterChange}
        onClear={onFilterClear}
        activeCount={activeFilterCount}
      />
      <DataTableExport onExportCSV={onExportCSV} onExportXLSX={onExportXLSX} />
    </DataTableToolbar>
  );
};
