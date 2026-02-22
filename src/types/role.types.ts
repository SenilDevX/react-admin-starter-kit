export type Role = {
  _id: string;
  name: string;
  description: string | null;
  permissions: string[];
  requiresTwoFactor: boolean;
  isSystem: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateRoleRequest = {
  name: string;
  description?: string;
  permissions: string[];
  requiresTwoFactor?: boolean;
};

export type UpdateRoleRequest = {
  name?: string;
  description?: string;
  permissions?: string[];
  isActive?: boolean;
  requiresTwoFactor?: boolean;
};

export type Permission = {
  _id: string;
  name: string;
  module: string;
  action: string;
  description: string | null;
};
