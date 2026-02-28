import type { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'motion/react';
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

export const StatsCard = ({
  title,
  value,
  icon: Icon,
  trend,
  variant = 'default',
}: StatsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <Card
        className={cn(
          'relative overflow-hidden py-0',
          variant === 'alert' && 'border-destructive/20 bg-destructive/5',
        )}
      >
        <CardContent className="px-0 p-4.5 space-y-3">
          <div className="flex items-center justify-between">
            <p className={cn("text-sm font-medium text-muted-foreground min-h-5", variant === 'alert' && 'text-destructive')}>{title}</p>
            <Icon
              className={cn(
                'size-4',
                variant === 'alert' ? 'text-destructive' : 'text-muted-foreground/60',
              )}
            />
          </div>
          <p
            className={cn(
              'text-2xl font-bold leading-9 tracking-tight min-h-8',
              variant === 'alert' && 'text-destructive',
            )}
          >
            {value}
          </p>
          <div className="flex items-center min-h-4 gap-1 text-xs">
            {trend && (
              <>
                {trend.isPositive ? (
                  <TrendingUp className="size-3 text-emerald-600" />
                ) : (
                  <TrendingDown className="size-3 text-red-600" />
                )}
                <span className={trend.isPositive ? 'text-emerald-600' : 'text-red-600'}>
                  {trend.value}
                </span>
                <span className="text-muted-foreground">{trend.label}</span>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
