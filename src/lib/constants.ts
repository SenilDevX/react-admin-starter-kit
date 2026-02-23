export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
  TWO_FACTOR_VERIFY: '/2fa-verify',
  DASHBOARD: '/',
  TODOS: '/todos',
  USERS: '/users',
  ROLES: '/roles',
  AUDITS: '/audits',
  SETTINGS: '/settings',
  ONBOARDING_2FA: '/onboarding/2fa-setup',
  ONBOARDING_PASSWORD: '/onboarding/change-password',
} as const;

export const QUERY_KEYS = {
  profile: ['profile'] as const,
  todos: (params?: Record<string, unknown>) => ['todos', params] as const,
  todo: (id: string) => ['todos', id] as const,
  users: (params?: Record<string, unknown>) => ['users', params] as const,
  user: (id: string) => ['users', id] as const,
  roles: (params?: Record<string, unknown>) => ['roles', params] as const,
  role: (id: string) => ['roles', id] as const,
  permissions: ['permissions'] as const,
  audits: (params?: Record<string, unknown>) => ['audits', params] as const,
  audit: (id: string) => ['audits', id] as const,
  dashboardStats: ['dashboard-stats'] as const,
} as const;

export const PERMISSION_MODULES = ['users', 'roles', 'permissions', 'todos', 'audits'] as const;
export const PERMISSION_ACTIONS = ['create', 'read', 'update', 'delete'] as const;

export const ACCESS_TOKEN_DURATION_MS = 15 * 60 * 1000; // 15 minutes
export const REFRESH_BUFFER_MS = 60 * 1000; // Refresh 1 minute before expiry
