import { PageHeader } from '@/components/shared/page-header';
import { useDashboardStats } from '../hooks/use-dashboard-stats';
import { StatsOverview } from '../components/stats-overview';
import { BarChartCard } from '../components/bar-chart-card';
import { RecentActivity } from '../components/recent-activity';

export const DashboardPage = () => {
  const { data: stats, isLoading } = useDashboardStats();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Welcome back! Here's an overview of your system."
      />

      <StatsOverview stats={stats} isLoading={isLoading} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <BarChartCard stats={stats} />
        </div>
        <div className="lg:col-span-3">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
};
