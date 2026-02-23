import { Link, useLocation } from 'react-router';
import {
  LayoutDashboard,
  CheckSquare,
  Users,
  Shield,
  FileText,
  Settings,
} from 'lucide-react';
import { usePermissions } from '@/hooks/use-permissions';
import { ROUTES } from '@/lib/constants';
import type { NavGroup } from '@/types';
import {
  Sidebar as SidebarRoot,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { UserMenu } from './user-menu';

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

export const AppSidebar = () => {
  const { hasPermission } = usePermissions();
  const location = useLocation();

  return (
    <SidebarRoot side="left" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to={ROUTES.DASHBOARD}>
                <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <LayoutDashboard className="size-4" />
                </div>
                <span className="text-lg font-bold truncate">GPMS Enterprise</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        {navConfig.map((group) => {
          const visibleItems = group.items.filter(
            (item) => !item.permission || hasPermission(item.permission),
          );

          if (visibleItems.length === 0) return null;

          return (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
              <SidebarMenu>
                {visibleItems.map((item) => {
                  const isActive = item.path === '/'
                    ? location.pathname === '/'
                    : location.pathname.startsWith(item.path);

                  return (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton asChild isActive={isActive} tooltip={item.label}>
                        <Link to={item.path}>
                          <item.icon />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroup>
          );
        })}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserMenu />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </SidebarRoot>
  );
};
