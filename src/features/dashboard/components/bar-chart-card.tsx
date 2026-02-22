import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { DashboardStats } from '@/services/dashboard.service';

type BarChartCardProps = {
  stats: DashboardStats | undefined;
};

export const BarChartCard = ({ stats }: BarChartCardProps) => {
  const data = [
    { name: 'Todos', value: stats?.totalTodos ?? 0 },
    { name: 'Users', value: stats?.totalUsers ?? 0 },
    { name: 'Roles', value: stats?.totalRoles ?? 0 },
    { name: 'Audits', value: stats?.totalAudits ?? 0 },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Module Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="value" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
