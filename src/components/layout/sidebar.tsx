import {
  LayoutDashboard,
  CheckSquare,
  Users,
  Shield,
  FileText,
  Settings,
  LogOut,
  HelpCircle,
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { usePermissions } from '@/hooks/use-permissions';
import { SidebarNavGroup } from './sidebar-nav-group';
import { SidebarNavItem } from './sidebar-nav-item';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ROUTES } from '@/lib/constants';
import type { NavGroup } from '@/types';

const navConfig: NavGroup[] = [
  {
    label: 'Overview',
    items: [
      { label: 'Dashboard', path: ROUTES.DASHBOARD, icon: LayoutDashboard },
    ],
  },
  {
    label: 'Management',
    items: [
      { label: 'Todos', path: ROUTES.TODOS, icon: CheckSquare, permission: 'todos.read' },
      { label: 'Users', path: ROUTES.USERS, icon: Users, permission: 'users.read' },
      { label: 'Roles', path: ROUTES.ROLES, icon: Shield, permission: 'roles.read' },
    ],
  },
  {
    label: 'System',
    items: [
      { label: 'Audit Logs', path: ROUTES.AUDITS, icon: FileText, permission: 'audits.read' },
      { label: 'Settings', path: ROUTES.SETTINGS, icon: Settings },
    ],
  },
];

export const Sidebar = () => {
  const { logout } = useAuth();
  const { hasPermission } = usePermissions();

  return (
    <aside className="flex h-screen w-60 flex-col border-r bg-card">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <LayoutDashboard className="h-4 w-4" />
        </div>
        <span className="text-lg font-bold">GPMS Enterprise</span>
      </div>

      <Separator />

      {/* Navigation */}
      <ScrollArea className="flex-1 px-2 py-4">
        {navConfig.map((group) => {
          const visibleItems = group.items.filter(
            (item) => !item.permission || hasPermission(item.permission),
          );

          if (visibleItems.length === 0) return null;

          return (
            <SidebarNavGroup key={group.label} label={group.label}>
              {visibleItems.map((item) => (
                <SidebarNavItem
                  key={item.path}
                  label={item.label}
                  path={item.path}
                  icon={item.icon}
                />
              ))}
            </SidebarNavGroup>
          );
        })}
      </ScrollArea>

      {/* Footer */}
      <div className="border-t p-2">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-3 text-muted-foreground"
          asChild
        >
          <a href="#" onClick={(e) => e.preventDefault()}>
            <HelpCircle className="h-4 w-4" />
            Help & Support
          </a>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-3 text-destructive hover:text-destructive"
          onClick={() => void logout()}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </aside>
  );
};
