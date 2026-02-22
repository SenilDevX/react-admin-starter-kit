import { useEffect, useRef } from 'react';
import { authService } from '@/services/auth.service';
import { useAuth } from './use-auth';
import { ACCESS_TOKEN_DURATION_MS, REFRESH_BUFFER_MS } from '@/lib/constants';

export const useTokenRefresh = () => {
  const { isAuthenticated, logout } = useAuth();
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    const scheduleRefresh = () => {
      const delay = ACCESS_TOKEN_DURATION_MS - REFRESH_BUFFER_MS;

      timerRef.current = setTimeout(async () => {
        try {
          await authService.refresh();
          scheduleRefresh();
        } catch {
          await logout();
        }
      }, delay);
    };

    scheduleRefresh();

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isAuthenticated, logout]);
};
