import type { Table } from '@tanstack/react-table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { GripVertical } from 'lucide-react';

type DataTableColumnCustomizerProps<TData> = {
  table: Table<TData>;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const DataTableColumnCustomizer = <TData,>({
  table,
  open,
  onOpenChange,
}: DataTableColumnCustomizerProps<TData>) => {
  const columns = table
    .getAllColumns()
    .filter((col) => col.getCanHide() && col.id !== 'select' && col.id !== 'actions');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Customize Table Columns</DialogTitle>
          <DialogDescription>Show, hide, and reorder columns.</DialogDescription>
        </DialogHeader>
        <div className="space-y-1">
          {columns.map((column) => (
            <div
              key={column.id}
              className="flex items-center justify-between rounded-md px-3 py-2 hover:bg-accent"
            >
              <div className="flex items-center gap-2">
                <GripVertical className="h-4 w-4 text-muted-foreground/50" />
                <span className="text-sm capitalize">
                  {column.id.replace(/([A-Z])/g, ' $1').trim()}
                </span>
              </div>
              <Switch
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between pt-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.toggleAllColumnsVisible(true)}
          >
            Reset to default
          </Button>
          <Button size="sm" onClick={() => onOpenChange(false)}>
            Save view
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
