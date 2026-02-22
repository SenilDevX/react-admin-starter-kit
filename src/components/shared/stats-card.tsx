import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

type StatsCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: {
    value: string;
    label: string;
    isPositive: boolean;
  };
  variant?: 'default' | 'alert';
};

export const StatsCard = ({ title, value, icon: Icon, trend, variant = 'default' }: StatsCardProps) => {
  return (
    <Card
      className={cn(
        'relative overflow-hidden',
        variant === 'alert' && 'border-destructive/20 bg-destructive/5',
      )}
    >
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <Icon
            className={cn(
              'h-4 w-4',
              variant === 'alert' ? 'text-destructive' : 'text-muted-foreground',
            )}
          />
        </div>
        <p className={cn('mt-2 text-2xl font-bold', variant === 'alert' && 'text-destructive')}>
          {value}
        </p>
        {trend && (
          <div className="mt-2 flex items-center gap-1 text-xs">
            {trend.isPositive ? (
              <TrendingUp className="h-3 w-3 text-emerald-600" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-600" />
            )}
            <span className={trend.isPositive ? 'text-emerald-600' : 'text-red-600'}>
              {trend.value}
            </span>
            <span className="text-muted-foreground">{trend.label}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
