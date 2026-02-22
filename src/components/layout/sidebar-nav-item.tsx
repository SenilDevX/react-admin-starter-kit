import { Link, useLocation } from 'react-router';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

type SidebarNavItemProps = {
  label: string;
  path: string;
  icon: LucideIcon;
};

export const SidebarNavItem = ({ label, path, icon: Icon }: SidebarNavItemProps) => {
  const location = useLocation();
  const isActive = path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  return (
    <Link
      to={path}
      className={cn(
        'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors',
        isActive
          ? 'bg-primary/10 text-primary border-l-[3px] border-primary'
          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground border-l-[3px] border-transparent',
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span>{label}</span>
    </Link>
  );
};
