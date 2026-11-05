import { z } from 'zod';

export const addProjectMemberSchema = z.object({
  userId: z.number().int().positive()
});
