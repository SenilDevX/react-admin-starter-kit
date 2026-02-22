import { Outlet } from 'react-router';
import { Sidebar } from './sidebar';
import { Header } from './header';
import { useTokenRefresh } from '@/hooks/use-token-refresh';

export const AppLayout = () => {
  useTokenRefresh();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto bg-background p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
