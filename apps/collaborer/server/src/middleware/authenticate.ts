import type { NextFunction, Request, Response } from 'express';
import { usersRepository } from '../repositories/users.repository.js';
import { UnauthorizedError } from '../utils/errors.js';
import { verifySessionToken } from '../utils/tokens.js';

export function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const token = req.cookies?.session as string | undefined;

  if (!token) {
    throw new UnauthorizedError();
  }

  let userId: number;
  try {
    userId = verifySessionToken(token).userId;
  } catch {
    throw new UnauthorizedError(
      'Your session has expired. Please log in again.'
    );
  }

  const user = usersRepository.findById(userId);
  if (!user) {
    throw new UnauthorizedError();
  }

  req.user = user;
  next();
}
