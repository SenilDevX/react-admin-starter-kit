import { api } from '@/lib/axios';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  ChangePasswordRequest,
  ChangeEmailRequest,
  VerifyOtpRequest,
  DisableTwoFactorRequest,
  TwoFactorSetupResponse,
  MessageResponse,
  UserProfile,
} from '@/types';

export const authService = {
  login: (data: LoginRequest) => api.post<unknown, LoginResponse>('/auth/login', data),

  register: (data: RegisterRequest) =>
    api.post<unknown, { id: string; email: string }>('/auth/register', data),

  refresh: () => api.post<unknown, MessageResponse>('/auth/refresh'),

  logout: () => api.post<unknown, void>('/auth/logout'),

  logoutAll: () => api.post<unknown, void>('/auth/logout-all'),

  getProfile: () => api.get<unknown, UserProfile>('/auth/me'),

  forgotPassword: (data: ForgotPasswordRequest) =>
    api.post<unknown, MessageResponse>('/auth/forgot-password', data),

  resetPassword: (data: ResetPasswordRequest) =>
    api.post<unknown, MessageResponse>('/auth/reset-password', data),

  changePassword: (data: ChangePasswordRequest) =>
    api.post<unknown, MessageResponse>('/auth/change-password', data),

  changeEmail: (data: ChangeEmailRequest) =>
    api.post<unknown, MessageResponse>('/auth/change-email', data),

  setupTwoFactor: () => api.post<unknown, TwoFactorSetupResponse>('/auth/2fa/setup'),

  confirmTwoFactor: (data: VerifyOtpRequest) =>
    api.post<unknown, MessageResponse>('/auth/2fa/confirm', data),

  authenticateTwoFactor: (data: VerifyOtpRequest) =>
    api.post<unknown, MessageResponse>('/auth/2fa/authenticate', data),

  disableTwoFactor: (data: DisableTwoFactorRequest) =>
    api.post<unknown, MessageResponse>('/auth/2fa/disable', data),
};
