import { z } from 'zod';

export const createOrganizationSchema = z.object({
  name: z.string().trim().min(1).max(120),
  description: z.string().trim().max(1000).nullable().optional()
});

export const updateOrganizationSchema = z
  .object({
    name: z.string().trim().min(1).max(120).optional(),
    description: z.string().trim().max(1000).nullable().optional(),
    logoUrl: z.string().trim().pipe(z.url()).nullable().optional()
  })
  .refine(data => Object.keys(data).length > 0, {
    message: 'At least one field must be provided.'
  });
