export interface PublicUser {
  id: number;
  email: string;
  username: string | null;
  name: string;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}

export interface RegisterInput {
  name: string;
  username: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface UpdateProfileInput {
  name: string;
  avatarUrl?: string | null;
  bio?: string | null;
}
