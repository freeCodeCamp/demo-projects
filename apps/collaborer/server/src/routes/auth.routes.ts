import { Router } from 'express';
import { authController } from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/authenticate.js';
import { authRateLimit } from '../middleware/rate-limit.js';

export const authRouter = Router();

authRouter.post('/register', authRateLimit, authController.register);
authRouter.post('/login', authRateLimit, authController.login);
authRouter.post('/logout', authController.logout);
authRouter.post(
  '/change-password',
  authenticate,
  authController.changePassword
);
authRouter.post(
  '/forgot-password',
  authRateLimit,
  authController.forgotPassword
);
authRouter.post('/reset-password', authRateLimit, authController.resetPassword);
