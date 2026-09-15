import { z } from 'zod';

export const createSubtaskSchema = z.object({
  title: z.string().trim().min(1).max(200)
});

export const updateSubtaskSchema = z
  .object({
    title: z.string().trim().min(1).max(200).optional(),
    isCompleted: z.boolean().optional()
  })
  .refine(data => Object.keys(data).length > 0, {
    message: 'At least one field must be provided.'
  });
