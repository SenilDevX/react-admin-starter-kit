import { Suspense } from 'react';
import { LoadingSpinner } from './loading-spinner';

export const LazyLoad = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>
);
