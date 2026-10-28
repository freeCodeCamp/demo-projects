import { apiFetch } from '../../lib/api/client.js';
import type {
  LoginInput,
  PublicUser,
  RegisterInput,
  UpdateProfileInput
} from './types.js';

export const authApi = {
  async register(input: RegisterInput): Promise<PublicUser> {
    const { data } = await apiFetch<{ data: PublicUser }>('/auth/register', {
      method: 'POST',
      body: input
    });
    return data;
  },

  async login(input: LoginInput): Promise<PublicUser> {
    const { data } = await apiFetch<{ data: PublicUser }>('/auth/login', {
      method: 'POST',
      body: input
    });
    return data;
  },

  logout(): Promise<void> {
    return apiFetch<void>('/auth/logout', { method: 'POST' });
  },

  async updateProfile(input: UpdateProfileInput): Promise<PublicUser> {
    const { data } = await apiFetch<{ data: PublicUser }>('/users/me', {
      method: 'PATCH',
      body: input
    });
    return data;
  },

  changePassword(currentPassword: string, newPassword: string): Promise<void> {
    return apiFetch<void>('/auth/change-password', {
      method: 'POST',
      body: { currentPassword, newPassword }
    });
  },

  async forgotPassword(email: string): Promise<void> {
    await apiFetch('/auth/forgot-password', {
      method: 'POST',
      body: { email }
    });
  },

  resetPassword(token: string, newPassword: string): Promise<void> {
    return apiFetch<void>('/auth/reset-password', {
      method: 'POST',
      body: { token, newPassword }
    });
  }
};
