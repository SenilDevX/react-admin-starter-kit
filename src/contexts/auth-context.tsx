import { createContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { authService } from '@/services/auth.service';
import type { UserProfile, LoginRequest, RegisterRequest } from '@/types';

type AuthState = {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
};

type AuthContextValue = AuthState & {
  login: (data: LoginRequest) => Promise<{ requiresTwoFactor: boolean }>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => Promise<void>;
  verifyTwoFactor: (token: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  const refreshProfile = useCallback(async () => {
    try {
      const user = await authService.getProfile();
      setState((prev) => ({ ...prev, user, isAuthenticated: true, isLoading: false }));
    } catch {
      setState((prev) => ({ ...prev, user: null, isAuthenticated: false, isLoading: false }));
    }
  }, []);

  // On mount, try to restore session via cookie
  useEffect(() => {
    refreshProfile();
  }, [refreshProfile]);

  const login = useCallback(async (data: LoginRequest) => {
    const response = await authService.login(data);

    if (response.requiresTwoFactor) {
      // Backend sets temp_token as httpOnly cookie — no need to store it
      return { requiresTwoFactor: true };
    }

    // Cookies are now set by the backend — fetch profile
    const user = await authService.getProfile();
    setState((prev) => ({
      ...prev,
      user,
      isAuthenticated: true,
    }));

    return { requiresTwoFactor: false };
  }, []);

  const register = useCallback(async (data: RegisterRequest) => {
    await authService.register(data);
  }, []);

  const verifyTwoFactor = useCallback(async (token: string) => {
    // Backend reads temp_token from cookie, sets access/refresh cookies
    await authService.authenticateTwoFactor({ token });

    const user = await authService.getProfile();
    setState((prev) => ({
      ...prev,
      user,
      isAuthenticated: true,
    }));
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch {
      // Ignore errors on logout
    } finally {
      setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
        verifyTwoFactor,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
