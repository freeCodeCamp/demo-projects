import type {
  Notification,
  NotificationType
} from '../models/notification.model.js';
import { notificationsRepository } from '../repositories/notifications.repository.js';
import { NotFoundError } from '../utils/errors.js';
import {
  buildPaginatedResult,
  type PaginationParams
} from '../utils/pagination.js';

export const notificationsService = {
  // Called by other services as a side effect of the action that triggered it
  // (task assignment, mentions, comments, ...) — never exposed as its own endpoint.
  notify(
    userId: number,
    type: NotificationType,
    data: Record<string, unknown>
  ): Notification {
    return notificationsRepository.create(userId, type, data);
  },

  list(userId: number, pagination: PaginationParams) {
    const notifications = notificationsRepository.list(
      userId,
      pagination.limit,
      pagination.offset
    );
    const total = notificationsRepository.count(userId);
    return buildPaginatedResult(notifications, total, pagination);
  },

  unreadCount(userId: number): number {
    return notificationsRepository.countUnread(userId);
  },

  markRead(id: number, userId: number): void {
    if (!notificationsRepository.markRead(id, userId)) {
      throw new NotFoundError(
        'NOTIFICATION_NOT_FOUND',
        'Notification not found.'
      );
    }
  },

  markAllRead(userId: number): void {
    notificationsRepository.markAllRead(userId);
  }
};
