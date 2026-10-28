import type { Request, Response } from 'express';

export function notFoundHandler(_req: Request, res: Response): void {
  res
    .status(404)
    .json({ error: { code: 'NOT_FOUND', message: 'Resource not found.' } });
}
