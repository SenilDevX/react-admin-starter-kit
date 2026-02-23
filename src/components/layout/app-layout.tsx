import { Outlet } from 'react-router';
import { AppSidebar } from './sidebar';
import { Header } from './header';
import { useTokenRefresh } from '@/hooks/use-token-refresh';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

export const AppLayout = () => {
  useTokenRefresh();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="h-svh overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto bg-background p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
