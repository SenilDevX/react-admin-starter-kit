import { useState } from 'react';
import type { ReactNode } from 'react';
import { RefreshCw, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type DataTableToolbarProps = {
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  onRefresh?: () => void;
  children?: ReactNode;
};

export const DataTableToolbar = ({
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  onRefresh,
  children,
}: DataTableToolbarProps) => {
  const [spinning, setSpinning] = useState(false);

  const handleRefresh = () => {
    onRefresh?.();
    setSpinning(true);
    setTimeout(() => setSpinning(false), 600);
  };

  return (
    <div className="flex items-center justify-between gap-4 py-4">
      <div className="flex flex-1 items-center gap-2">
        {onSearchChange && (
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
        )}
      </div>
      <div className="flex items-center gap-2">
        {onRefresh && (
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className={cn('h-4 w-4', spinning && 'animate-spin')} />
          </Button>
        )}
        {children}
      </div>
    </div>
  );
};
