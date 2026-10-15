import { z } from 'zod';

const statusEnum = z.enum([
  'planning',
  'active',
  'on_hold',
  'completed',
  'archived'
]);

export const createProjectSchema = z.object({
  name: z.string().trim().min(1).max(120),
  description: z.string().trim().max(2000).nullable().optional(),
  status: statusEnum.optional()
});

export const updateProjectSchema = z
  .object({
    name: z.string().trim().min(1).max(120).optional(),
    description: z.string().trim().max(2000).nullable().optional(),
    status: statusEnum.optional()
  })
  .refine(data => Object.keys(data).length > 0, {
    message: 'At least one field must be provided.'
  });
