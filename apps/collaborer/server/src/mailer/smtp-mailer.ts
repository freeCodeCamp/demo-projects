import nodemailer from 'nodemailer';
import { env } from '../config/env.js';
import type { Mailer, MailMessage } from './types.js';

// Only constructed when SMTP_HOST is set — see mailer/index.ts.
const transport = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: env.SMTP_SECURE,
  auth:
    env.SMTP_USER && env.SMTP_PASSWORD
      ? { user: env.SMTP_USER, pass: env.SMTP_PASSWORD }
      : undefined
});

export const smtpMailer: Mailer = {
  async send(message: MailMessage): Promise<void> {
    await transport.sendMail({
      from: env.SMTP_FROM,
      to: message.to,
      subject: message.subject,
      text: message.text,
      html: message.html
    });
  }
};
