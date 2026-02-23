import { Suspense } from 'react';
import { LoadingSpinner } from './loading-spinner';

export const LazyLoad = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={<LoadingSpinner className="h-full" />}>{children}</Suspense>
);
