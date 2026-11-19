import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { Mailer, MailMessage } from './types.js';

// No SMTP configured (the default in local dev) — instead of sending
// anything, log the email and write it to disk so the password-reset/invite
// link can actually be opened and the flow verified end to end.
const OUTBOX_DIR = path.resolve('./data/mail');

function outboxFilename(message: MailMessage): string {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const safeTo = message.to.replace(/[^a-z0-9@._-]/gi, '_');
  return `${timestamp}-${safeTo}.html`;
}

export const consoleMailer: Mailer = {
  async send(message: MailMessage): Promise<void> {
    console.log(
      `[mailer] "${message.subject}" -> ${message.to}\n${message.text}`
    );

    await mkdir(OUTBOX_DIR, { recursive: true });
    const filePath = path.join(OUTBOX_DIR, outboxFilename(message));
    await writeFile(filePath, message.html);
    console.log(`[mailer] wrote ${filePath}`);
  }
};
