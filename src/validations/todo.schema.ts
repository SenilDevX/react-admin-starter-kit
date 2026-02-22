import { z } from 'zod';

export const createTodoSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
});

export const updateTodoSchema = z.object({
  title: z.string().min(1, 'Title is required').optional(),
  description: z.string().optional(),
  status: z.enum(['pending', 'completed']).optional(),
});

export type CreateTodoFormValues = z.infer<typeof createTodoSchema>;
export type UpdateTodoFormValues = z.infer<typeof updateTodoSchema>;
