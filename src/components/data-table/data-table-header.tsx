import type { Column } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type DataTableHeaderProps<TData, TValue> = {
  column: Column<TData, TValue>;
  title: string;
  className?: string;
};

export const DataTableHeader = <TData, TValue>({
  column,
  title,
  className,
}: DataTableHeaderProps<TData, TValue>) => {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <span>{title}</span>
      <Button
        variant="ghost"
        size="icon-xs"
        aria-label={`Sort by ${title}`}
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        {column.getIsSorted() === 'desc' ? (
          <ArrowDown />
        ) : column.getIsSorted() === 'asc' ? (
          <ArrowUp />
        ) : (
          <ArrowUpDown className="text-muted-foreground/50" />
        )}
      </Button>
    </div>
  );
};
