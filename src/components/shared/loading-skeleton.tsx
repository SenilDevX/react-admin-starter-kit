import { Skeleton } from '@/components/ui/skeleton';

export const TableSkeleton = ({ rows = 5, cols = 4 }: { rows?: number; cols?: number }) => {
  return (
    <div className="space-y-3">
      <div className="flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <Skeleton key={i} className="h-8 flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {Array.from({ length: cols }).map((_, j) => (
            <Skeleton key={j} className="h-10 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
};

export const CardSkeleton = () => {
  return (
    <div className="rounded-lg border p-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-4" />
      </div>
      <Skeleton className="mt-3 h-8 w-24" />
      <Skeleton className="mt-2 h-3 w-20" />
    </div>
  );
};

export const StatsRowSkeleton = ({ count = 4 }: { count?: number } = {}) => {
  const colsClass =
    count === 5
      ? 'grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5'
      : 'grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4';
  return (
    <div className={`grid ${colsClass}`}>
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
};
