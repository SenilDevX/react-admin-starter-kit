import { z } from 'zod';

export const createUserSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  roleId: z.string().min(1, 'Role is required'),
  requireTwoFactorSetup: z.boolean().optional(),
});

export const updateUserSchema = z.object({
  roleId: z.string().optional(),
  twoFactorEnabled: z.boolean().optional(),
});

export type CreateUserFormValues = z.infer<typeof createUserSchema>;
export type UpdateUserFormValues = z.infer<typeof updateUserSchema>;
