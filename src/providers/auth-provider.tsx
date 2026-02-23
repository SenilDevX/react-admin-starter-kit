import { useEffect, type ReactNode } from 'react';
import { useAuthStore } from '@/stores/auth-store';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { refreshProfile } = useAuthStore();
  
  useEffect(() => {
    refreshProfile();
  }, []);

  return children;
};
