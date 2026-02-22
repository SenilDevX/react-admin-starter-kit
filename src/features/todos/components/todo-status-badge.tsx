import { StatusBadge } from '@/components/shared/status-badge';
import { TODO_STATUS, type TodoStatus } from '@/types';

const statusConfig: Record<TodoStatus, { label: string; variant: 'success' | 'warning' }> = {
  [TODO_STATUS.COMPLETED]: { label: 'Completed', variant: 'success' },
  [TODO_STATUS.PENDING]: { label: 'Pending', variant: 'warning' },
};

export const TodoStatusBadge = ({ status }: { status: TodoStatus }) => {
  const config = statusConfig[status];
  return <StatusBadge status={config.label} variant={config.variant} />;
};
