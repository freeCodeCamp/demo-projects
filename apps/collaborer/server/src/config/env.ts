import { z } from 'zod';

try {
  process.loadEnvFile();
} catch {
  // No .env file present — fall back to real environment variables (e.g. in production).
}

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production', 'test'])
    .default('development'),
  PORT: z.coerce.number().int().positive().default(4000),
  DATABASE_URL: z.string().min(1).default('./data/collaborer.db'),
  AUTH_SECRET: z.string().min(1),
  STORAGE_PATH: z.string().min(1).default('./storage'),
  // Used to build links (password reset, org invitations) that get emailed out.
  FRONTEND_URL: z.string().min(1).default('http://localhost:4321'),
  // SMTP is optional: unset in local dev, where the mailer just logs/writes
  // outgoing mail to disk instead of actually sending it (see src/mailer).
  SMTP_HOST: z.string().min(1).optional(),
  SMTP_PORT: z.coerce.number().int().positive().default(587),
  // z.coerce.boolean() would coerce via JS's Boolean(str), where the string
  // "false" is truthy — this checks the literal value instead.
  SMTP_SECURE: z
    .string()
    .optional()
    .transform(value => value === 'true'),
  SMTP_USER: z.string().min(1).optional(),
  SMTP_PASSWORD: z.string().min(1).optional(),
  SMTP_FROM: z.string().min(1).default('Collaborer <no-reply@collaborer.local>')
});

export const env = envSchema.parse(process.env);
