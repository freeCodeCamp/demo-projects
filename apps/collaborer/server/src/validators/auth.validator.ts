import { z } from 'zod';

const emailSchema = z.string().trim().toLowerCase().pipe(z.email());

const usernameSchema = z
  .string()
  .trim()
  .toLowerCase()
  .regex(
    /^[a-z0-9_]{3,30}$/,
    'Username must be 3-30 characters: letters, numbers, and underscores only.'
  );

export const registerSchema = z.object({
  name: z.string().trim().min(1).max(120),
  username: usernameSchema,
  email: emailSchema,
  password: z.string().min(8).max(256)
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1)
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1),
  newPassword: z.string().min(8).max(256)
});

export const forgotPasswordSchema = z.object({
  email: emailSchema
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1),
  newPassword: z.string().min(8).max(256)
});
