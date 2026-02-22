import { RouterProvider } from 'react-router';
import { AppProviders } from '@/providers/app-providers';
import { router } from '@/routes';

export const App = () => {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
};
