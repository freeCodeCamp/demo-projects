import type { Request, Response } from 'express';
import { authService } from '../services/auth.service.js';
import {
  changePasswordSchema,
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema
} from '../validators/auth.validator.js';

const SESSION_COOKIE = 'session';
const SESSION_COOKIE_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

function setSessionCookie(res: Response, token: string): void {
  res.cookie(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: SESSION_COOKIE_MAX_AGE_MS
  });
}

export const authController = {
  register(req: Request, res: Response): void {
    const input = registerSchema.parse(req.body);
    const { user, token } = authService.register(input);
    setSessionCookie(res, token);
    res.status(201).json({ data: user });
  },

  login(req: Request, res: Response): void {
    const input = loginSchema.parse(req.body);
    const { user, token } = authService.login(input);
    setSessionCookie(res, token);
    res.json({ data: user });
  },

  logout(_req: Request, res: Response): void {
    res.clearCookie(SESSION_COOKIE);
    res.status(204).send();
  },

  changePassword(req: Request, res: Response): void {
    const input = changePasswordSchema.parse(req.body);
    authService.changePassword(req.user!.id, input);
    res.status(204).send();
  },

  async forgotPassword(req: Request, res: Response): Promise<void> {
    const input = forgotPasswordSchema.parse(req.body);
    await authService.requestPasswordReset(input.email);
    res.status(202).json({
      data: {
        message: 'If that email is registered, a reset link has been sent.'
      }
    });
  },

  resetPassword(req: Request, res: Response): void {
    const input = resetPasswordSchema.parse(req.body);
    authService.resetPassword(input.token, input.newPassword);
    res.status(204).send();
  }
};
