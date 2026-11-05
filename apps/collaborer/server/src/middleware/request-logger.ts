import type { NextFunction, Request, Response } from 'express';

export function requestLogger(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
}
