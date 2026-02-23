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
        trend={{
          value: '8.4%',
          label: 'vs Last Year',
          isPositive: true,
        }}

      />
      <StatsCard
        title="Total Users"
        value={stats?.totalUsers ?? 0}
        icon={Users}
        trend={{
          value: '200%',
          label: 'vs Last Year',
          isPositive: true,
        }}
      />
      <StatsCard
        title="Total Roles"
        value={stats?.totalRoles ?? 0}
        icon={Shield}
        trend={{
          value: '74%',
          label: 'vs Last Year',
          isPositive: true,
        }}
      />
      <StatsCard
        title="Total Audits"
        value={stats?.totalAudits ?? 0}
        icon={FileText}
        variant='alert'
        trend={{
          value: '8.4',
          label: 'vs Last Year',
          isPositive: false,
        }}
      />
    </div>
  );
};
