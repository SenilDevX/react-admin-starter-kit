import { useQuery } from '@tanstack/react-query';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { DataTableFilter, type FilterField } from '@/components/data-table/data-table-filter';
import { DataTableExport } from '@/components/data-table/data-table-export';
import { roleService } from '@/services/role.service';
import { QUERY_KEYS } from '@/lib/constants';

type UserTableToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  filters: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
  onFilterClear: () => void;
  activeFilterCount: number;
  onExportCSV: () => void;
  onExportXLSX: () => void;
};

export const UserTableToolbar = ({
  search,
  onSearchChange,
  filters,
  onFilterChange,
  onFilterClear,
  activeFilterCount,
  onExportCSV,
  onExportXLSX,
}: UserTableToolbarProps) => {
  const { data: rolesData } = useQuery({
    queryKey: QUERY_KEYS.roles({}),
    queryFn: () => roleService.getAll({ limit: 100 }),
  });

  const roleFilterFields: FilterField[] = [
    {
      key: 'roleId',
      label: 'Role',
      options: (rolesData?.items ?? []).map((role) => ({
        label: role.name,
        value: role._id,
      })),
    },
  ];

  return (
    <DataTableToolbar
      searchValue={search}
      onSearchChange={onSearchChange}
      searchPlaceholder="Search users..."
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
