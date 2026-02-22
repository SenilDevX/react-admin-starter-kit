export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isTwoFactorEnabled: boolean;
  mustChangePassword: boolean;
  mustSetupTwoFactor: boolean;
  roleId: {
    _id: string;
    name: string;
    permissions: string[];
  } | null;
  createdAt: string;
  updatedAt: string;
};

export type CreateUserRequest = {
  firstName: string;
  lastName: string;
  email: string;
  roleId: string;
  requireTwoFactorSetup?: boolean;
};

export type UpdateUserRequest = {
  roleId?: string;
  twoFactorEnabled?: boolean;
};

export type ListUsersQuery = {
  search?: string;
  roleId?: string;
  page?: number;
  limit?: number;
};
