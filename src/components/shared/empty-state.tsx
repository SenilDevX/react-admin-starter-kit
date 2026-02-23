import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';
import { InboxIcon } from 'lucide-react';
import { motion } from 'motion/react';

type EmptyStateProps = {
  icon?: LucideIcon;
  title?: string;
  description?: string;
  children?: ReactNode;
};

export const EmptyState = ({
  icon: Icon = InboxIcon,
  title = 'No data found',
  description = 'There are no items to display.',
  children,
}: EmptyStateProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center gap-3 py-16"
    >
      <Icon className="h-12 w-12 text-muted-foreground/40" />
      <div className="text-center">
        <h3 className="text-sm font-medium">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      {children && <div className="mt-2">{children}</div>}
    </motion.div>
  );
};
