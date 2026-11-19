import { db } from '../db/index.js';
import type {
  Notification,
  NotificationType
} from '../models/notification.model.js';

interface NotificationRow {
  id: number;
  user_id: number;
  type: NotificationType;
  data: string;
  is_read: number;
  created_at: string;
}

const insertStmt = db.prepare(
  'INSERT INTO notifications (user_id, type, data) VALUES (?, ?, ?)'
);
const findByIdStmt = db.prepare('SELECT * FROM notifications WHERE id = ?');

const listStmt = db.prepare(
  'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?'
);

const countStmt = db.prepare(
  'SELECT COUNT(*) AS count FROM notifications WHERE user_id = ?'
);
const countUnreadStmt = db.prepare(
  'SELECT COUNT(*) AS count FROM notifications WHERE user_id = ? AND is_read = 0'
);

const markReadStmt = db.prepare(
  'UPDATE notifications SET is_read = 1 WHERE id = ? AND user_id = ?'
);
const markAllReadStmt = db.prepare(
  'UPDATE notifications SET is_read = 1 WHERE user_id = ? AND is_read = 0'
);

function toNotification(row: NotificationRow): Notification {
  return {
    ...row,
    data: JSON.parse(row.data) as Record<string, unknown>,
    is_read: Boolean(row.is_read)
  };
}

export const notificationsRepository = {
  create(
    userId: number,
    type: NotificationType,
    data: Record<string, unknown>
  ): Notification {
    const result = insertStmt.run(userId, type, JSON.stringify(data));
    return toNotification(
      findByIdStmt.get(result.lastInsertRowid) as NotificationRow
    );
  },

  list(userId: number, limit: number, offset: number): Notification[] {
    return (listStmt.all(userId, limit, offset) as NotificationRow[]).map(
      toNotification
    );
  },

  count(userId: number): number {
    return (countStmt.get(userId) as { count: number }).count;
  },

  countUnread(userId: number): number {
    return (countUnreadStmt.get(userId) as { count: number }).count;
  },

  // Scoped by user_id in the same statement, not just the id — a user can never
  // mark someone else's notification as read by guessing an id. Returns whether a
  // row actually changed, so the caller can 404 on a no-op.
  markRead(id: number, userId: number): boolean {
    return markReadStmt.run(id, userId).changes > 0;
  },

  markAllRead(userId: number): void {
    markAllReadStmt.run(userId);
  }
};
