import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';

const KEY_LENGTH = 64;

export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString('hex');
  const derivedKey = scryptSync(password, salt, KEY_LENGTH);
  return `${salt}:${derivedKey.toString('hex')}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  const [salt, hash] = storedHash.split(':');
  if (!salt || !hash) return false;

  const hashBuffer = Buffer.from(hash, 'hex');
  const candidateBuffer = scryptSync(password, salt, KEY_LENGTH);

  return (
    hashBuffer.length === candidateBuffer.length &&
    timingSafeEqual(hashBuffer, candidateBuffer)
  );
}
