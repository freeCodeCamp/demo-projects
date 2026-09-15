import { env } from '../config/env.js';
import { consoleMailer } from './console-mailer.js';
import { smtpMailer } from './smtp-mailer.js';
import type { Mailer } from './types.js';

export type { MailMessage } from './types.js';

// The rest of the app depends on this interface, not a specific transport —
// set SMTP_HOST (see .env.example) to actually send mail; otherwise every
// send() logs and writes to ./data/mail instead.
export const mailer: Mailer = env.SMTP_HOST ? smtpMailer : consoleMailer;
