import { z } from 'zod';

export const createInvitationSchema = z.object({
  email: z.string().trim().toLowerCase().pipe(z.email()),
  role: z.enum(['admin', 'member'])
});
