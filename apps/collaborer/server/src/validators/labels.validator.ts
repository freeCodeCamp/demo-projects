import { z } from 'zod';

const colorSchema = z
  .string()
  .trim()
  .regex(/^#[0-9a-fA-F]{6}$/, 'Color must be a hex value like #ff0000.');

export const createLabelSchema = z.object({
  name: z.string().trim().min(1).max(50),
  color: colorSchema
});

export const updateLabelSchema = z
  .object({
    name: z.string().trim().min(1).max(50).optional(),
    color: colorSchema.optional()
  })
  .refine(data => Object.keys(data).length > 0, {
    message: 'At least one field must be provided.'
  });

export const attachLabelSchema = z.object({
  labelId: z.number().int().positive()
});
