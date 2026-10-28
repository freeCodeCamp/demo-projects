import { randomBytes } from 'node:crypto';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

const SESSION_TOKEN_TTL = '7d';

export interface SessionTokenPayload {
  userId: number;
}

export function signSessionToken(payload: SessionTokenPayload): string {
  return jwt.sign(payload, env.AUTH_SECRET, { expiresIn: SESSION_TOKEN_TTL });
}

export function verifySessionToken(token: string): SessionTokenPayload {
  return jwt.verify(token, env.AUTH_SECRET) as SessionTokenPayload;
}

// Opaque, single-use tokens for invitations and password resets (not JWTs —
// these are looked up directly in the database, so they can be revoked/expired there).
export function generateOpaqueToken(): string {
  return randomBytes(32).toString('hex');
}
