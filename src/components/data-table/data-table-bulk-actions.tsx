import { Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

type DataTableBulkActionsProps = {
  selectedCount: number;
  onDelete?: () => void;
  onClear: () => void;
};

export const DataTableBulkActions = ({
  selectedCount,
  onDelete,
  onClear,
}: DataTableBulkActionsProps) => {
  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center gap-3 rounded-lg border bg-card px-4 py-2.5 shadow-sm">
      <span className="text-sm font-medium">{selectedCount} selected</span>
      <div className="flex items-center gap-2">
        {onDelete && (
          <Button variant="destructive" size="sm" onClick={onDelete}>
            <Trash2 className="mr-1.5 h-3.5 w-3.5" />
            Delete
          </Button>
        )}
        <Button variant="ghost" size="sm" onClick={onClear}>
          <X className="mr-1.5 h-3.5 w-3.5" />
          Clear
        </Button>
      </div>
    </div>
  );
};
