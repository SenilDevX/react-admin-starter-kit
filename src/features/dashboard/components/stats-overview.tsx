import { ListTodo, Users, Shield, FileText } from 'lucide-react';
import { StatsCard } from '@/components/shared/stats-card';
import { StatsRowSkeleton } from '@/components/shared/loading-skeleton';
import type { DashboardStats } from '@/services/dashboard.service';

type StatsOverviewProps = {
  stats: DashboardStats | undefined;
  isLoading: boolean;
};

export const StatsOverview = ({ stats, isLoading }: StatsOverviewProps) => {
  if (isLoading) {
    return <StatsRowSkeleton />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Todos"
        value={stats?.totalTodos ?? 0}
        icon={ListTodo}
      />
      <StatsCard
        title="Total Users"
        value={stats?.totalUsers ?? 0}
        icon={Users}
      />
      <StatsCard
        title="Total Roles"
        value={stats?.totalRoles ?? 0}
        icon={Shield}
      />
      <StatsCard
        title="Total Audits"
        value={stats?.totalAudits ?? 0}
        icon={FileText}
      />
    </div>
  );
};
