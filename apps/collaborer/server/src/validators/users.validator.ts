import { z } from 'zod';

export const updateProfileSchema = z.object({
  name: z.string().trim().min(1).max(120),
  avatarUrl: z.string().trim().pipe(z.url()).nullable().optional(),
  bio: z.string().trim().max(1000).nullable().optional()
});
