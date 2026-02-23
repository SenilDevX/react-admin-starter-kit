import { Link, useLocation } from 'react-router';
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
import { useAuthStore } from '@/stores/auth-store';
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
  const { logout } = useAuthStore();
  const { hasPermission } = usePermissions();
  const location = useLocation();

  return (
    <SidebarRoot side="left" collapsible="icon">
      <SidebarHeader>
        <div className="flex h-8 items-center gap-2 px-2">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <LayoutDashboard className="h-4 w-4" />
          </div>
          <span className="text-lg font-bold truncate group-data-[collapsible=icon]:hidden">
            GPMS Enterprise
          </span>
        </div>
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
            <SidebarMenuButton tooltip="Help & Support" asChild>
              <a href="#" onClick={(e) => e.preventDefault()}>
                <HelpCircle />
                <span>Help & Support</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Logout"
              onClick={() => void logout()}
              className="text-destructive hover:text-destructive"
            >
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </SidebarRoot>
  );
};
