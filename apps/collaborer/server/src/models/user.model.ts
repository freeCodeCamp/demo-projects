export interface User {
  id: number;
  email: string;
  username: string | null;
  password_hash: string;
  name: string;
  avatar_url: string | null;
  bio: string | null;
  reset_token: string | null;
  reset_token_expires_at: string | null;
  created_at: string;
  updated_at: string;
}

export type PublicUser = Omit<
  User,
  'password_hash' | 'reset_token' | 'reset_token_expires_at'
>;

export function toPublicUser(user: User): PublicUser {
  const {
    password_hash: _passwordHash,
    reset_token: _resetToken,
    reset_token_expires_at: _resetExpiry,
    ...publicUser
  } = user;
  return publicUser;
}
