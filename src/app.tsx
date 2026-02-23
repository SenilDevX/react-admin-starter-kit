import { RouterProvider } from 'react-router';
import { AppProviders } from '@/providers/app-providers';
import { router } from '@/routes';
import { Badge } from './components/ui/badge';

export const App = () => {
  return (
    <>
      <AppProviders>
        <RouterProvider router={router} />
      </AppProviders>
      {import.meta.env.VITE_ENVIRONMENT === 'dev' && (
        <Badge className="z-30 fixed bottom-16 right-4">Dev</Badge>
      )}
    </>
  );
};
