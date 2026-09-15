import { db } from '../db/index.js';
import type { User } from '../models/user.model.js';

const insertUserStmt = db.prepare(`
  INSERT INTO users (email, username, password_hash, name)
  VALUES (@email, @username, @passwordHash, @name)
`);

const findByIdStmt = db.prepare('SELECT * FROM users WHERE id = ?');
const findByEmailStmt = db.prepare('SELECT * FROM users WHERE email = ?');
const findByUsernameStmt = db.prepare('SELECT * FROM users WHERE username = ?');

const updateProfileStmt = db.prepare(`
  UPDATE users
  SET name = @name, avatar_url = @avatarUrl, bio = @bio, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
  WHERE id = @id
`);

const updatePasswordHashStmt = db.prepare(`
  UPDATE users SET password_hash = ?, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now') WHERE id = ?
`);

const setResetTokenStmt = db.prepare(
  'UPDATE users SET reset_token = ?, reset_token_expires_at = ? WHERE id = ?'
);

const findByResetTokenStmt = db.prepare(`
  SELECT * FROM users WHERE reset_token = ? AND reset_token_expires_at > strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
`);

const clearResetTokenStmt = db.prepare(
  'UPDATE users SET reset_token = NULL, reset_token_expires_at = NULL WHERE id = ?'
);

export const usersRepository = {
  create(input: {
    email: string;
    username: string;
    passwordHash: string;
    name: string;
  }): User {
    const result = insertUserStmt.run(input);
    return findByIdStmt.get(result.lastInsertRowid) as User;
  },

  findById(id: number): User | undefined {
    return findByIdStmt.get(id) as User | undefined;
  },

  findByEmail(email: string): User | undefined {
    return findByEmailStmt.get(email) as User | undefined;
  },

  findByUsername(username: string): User | undefined {
    return findByUsernameStmt.get(username) as User | undefined;
  },

  updateProfile(
    id: number,
    input: { name: string; avatarUrl: string | null; bio: string | null }
  ): User {
    updateProfileStmt.run({ id, ...input });
    return findByIdStmt.get(id) as User;
  },

  updatePasswordHash(id: number, passwordHash: string): void {
    updatePasswordHashStmt.run(passwordHash, id);
  },

  setResetToken(id: number, token: string, expiresAt: string): void {
    setResetTokenStmt.run(token, expiresAt, id);
  },

  findByResetToken(token: string): User | undefined {
    return findByResetTokenStmt.get(token) as User | undefined;
  },

  clearResetToken(id: number): void {
    clearResetTokenStmt.run(id);
  }
};
