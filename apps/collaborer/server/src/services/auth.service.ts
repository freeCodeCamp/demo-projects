import { env } from '../config/env.js';
import { mailer } from '../mailer/index.js';
import { toPublicUser } from '../models/user.model.js';
import { usersRepository } from '../repositories/users.repository.js';
import {
  BadRequestError,
  ConflictError,
  UnauthorizedError
} from '../utils/errors.js';
import { hashPassword, verifyPassword } from '../utils/password.js';
import { generateOpaqueToken, signSessionToken } from '../utils/tokens.js';

const RESET_TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

export const authService = {
  register(input: {
    name: string;
    username: string;
    email: string;
    password: string;
  }) {
    if (usersRepository.findByEmail(input.email)) {
      throw new ConflictError(
        'EMAIL_TAKEN',
        'An account with this email already exists.'
      );
    }

    if (usersRepository.findByUsername(input.username)) {
      throw new ConflictError(
        'USERNAME_TAKEN',
        'This username is already taken.'
      );
    }

    const user = usersRepository.create({
      email: input.email,
      username: input.username,
      name: input.name,
      passwordHash: hashPassword(input.password)
    });

    return {
      user: toPublicUser(user),
      token: signSessionToken({ userId: user.id })
    };
  },

  login(input: { email: string; password: string }) {
    const user = usersRepository.findByEmail(input.email);

    if (!user || !verifyPassword(input.password, user.password_hash)) {
      throw new UnauthorizedError('Invalid email or password.');
    }

    return {
      user: toPublicUser(user),
      token: signSessionToken({ userId: user.id })
    };
  },

  changePassword(
    userId: number,
    input: { currentPassword: string; newPassword: string }
  ): void {
    const user = usersRepository.findById(userId);

    if (!user || !verifyPassword(input.currentPassword, user.password_hash)) {
      throw new UnauthorizedError('Current password is incorrect.');
    }

    usersRepository.updatePasswordHash(userId, hashPassword(input.newPassword));
  },

  async requestPasswordReset(email: string): Promise<void> {
    const user = usersRepository.findByEmail(email);
    if (!user) return; // don't reveal whether the email is registered

    const token = generateOpaqueToken();
    const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MS).toISOString();
    usersRepository.setResetToken(user.id, token, expiresAt);

    const link = `${env.FRONTEND_URL}/password-reset/${token}`;
    await mailer.send({
      to: user.email,
      subject: 'Reset your Collaborer password',
      text: `Reset your password: ${link}\n\nThis link expires in 1 hour. If you didn't request this, you can ignore this email.`,
      html: `<p>Reset your password by clicking the link below.</p><p><a href="${link}">${link}</a></p><p>This link expires in 1 hour. If you didn't request this, you can ignore this email.</p>`
    });
  },

  resetPassword(token: string, newPassword: string): void {
    const user = usersRepository.findByResetToken(token);

    if (!user) {
      throw new BadRequestError(
        'INVALID_RESET_TOKEN',
        'This password reset link is invalid or has expired.'
      );
    }

    usersRepository.updatePasswordHash(user.id, hashPassword(newPassword));
    usersRepository.clearResetToken(user.id);
  }
};
