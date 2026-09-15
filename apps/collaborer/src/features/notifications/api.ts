import { apiFetch, type PaginatedResult } from '../../lib/api/client.js';
import type { Notification } from './types.js';

export const notificationsApi = {
  list(page = 1): Promise<PaginatedResult<Notification>> {
    return apiFetch<PaginatedResult<Notification>>(
      `/notifications?page=${page}`
    );
  },

  async unreadCount(): Promise<number> {
    const { data } = await apiFetch<{ data: { count: number } }>(
      '/notifications/unread-count'
    );
    return data.count;
  },

  markRead(notificationId: number): Promise<void> {
    return apiFetch<void>(`/notifications/${notificationId}/read`, {
      method: 'POST'
    });
  },

  markAllRead(): Promise<void> {
    return apiFetch<void>('/notifications/read-all', { method: 'POST' });
  }
};
