import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { DashboardStats } from '@/services/dashboard.service';

const chartConfig = {
  value: {
    label: 'Count',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

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
        <ChartContainer config={chartConfig} className="aspect-auto h-75 w-full">
          <BarChart data={data} layout="horizontal">
            <CartesianGrid vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="value" fill="var(--color-value)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
