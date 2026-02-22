import { useQuery } from '@tanstack/react-query';
import { auditService } from '@/services/audit.service';
import { QUERY_KEYS } from '@/lib/constants';
import { formatRelativeTime, capitalize } from '@/lib/format';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';

const getInitials = (name: string) => {
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

const ActivitySkeleton = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex-1 space-y-1">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/4" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const RecentActivity = () => {
  const { data, isLoading } = useQuery({
    queryKey: QUERY_KEYS.audits({ page: 1, limit: 5 }),
    queryFn: () => auditService.getAll({ page: 1, limit: 5 }),
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <ActivitySkeleton />
        ) : (
          <div className="space-y-4">
            {data?.items.map((audit) => (
              <div key={audit._id} className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{getInitials(audit.userName)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium leading-none truncate">
                    {audit.userName}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {capitalize(audit.action)} a {audit.module.replace(/s$/, '')}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {formatRelativeTime(audit.createdAt)}
                </span>
              </div>
            ))}
            {data?.items.length === 0 && (
              <p className="text-sm text-muted-foreground text-center py-4">
                No recent activity
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
