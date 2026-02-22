import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type StatusBadgeProps = {
  status: string;
  variant?: 'default' | 'success' | 'warning' | 'destructive' | 'info';
  className?: string;
};

const variantClasses = {
  default: 'bg-secondary text-secondary-foreground',
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  destructive: 'bg-red-50 text-red-700 border-red-200',
  info: 'bg-blue-50 text-blue-700 border-blue-200',
};

export const StatusBadge = ({ status, variant = 'default', className }: StatusBadgeProps) => {
  return (
    <Badge variant="outline" className={cn('text-xs font-medium', variantClasses[variant], className)}>
      {status}
    </Badge>
  );
};
