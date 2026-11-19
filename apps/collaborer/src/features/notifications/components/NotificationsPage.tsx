import './notifications.css';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from '../../../components/alert.js';
import { Button } from '../../../components/button.js';
import { useSession } from '../../../lib/auth/session.js';
import { formatRelativeTime } from '../../../lib/utils/format.js';
import type { PaginationMeta } from '../../../lib/api/client.js';
import { notificationsApi } from '../api.js';
import { describeNotification, notificationLink } from '../describe.js';
import type { Notification } from '../types.js';

export function NotificationsPage() {
  const session = useSession();

  const [notifications, setNotifications] = useState<Notification[] | null>(
    null
  );
  const [pagination, setPagination] = useState<PaginationMeta | null>(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback((targetPage: number) => {
    setError(null);
    notificationsApi
      .list(targetPage)
      .then(result => {
        setNotifications(result.data);
        setPagination(result.pagination);
      })
      .catch(err =>
        setError(
          err instanceof Error ? err.message : 'Failed to load notifications.'
        )
      );
  }, []);

  useEffect(() => load(page), [load, page]);

  if (session.status === 'loading' || !notifications) {
    return (
      <p className='loading-state' role='status'>
        Loading…
      </p>
    );
  }
  if (session.status === 'unauthenticated') {
    if (typeof window !== 'undefined') {
      window.location.href = `/login?redirect=${encodeURIComponent(
        window.location.pathname
      )}`;
    }
    return <></>;
  }

  async function handleOpen(notification: Notification) {
    const link = notificationLink(notification);
    if (!notification.is_read) {
      try {
        await notificationsApi.markRead(notification.id);
        setNotifications(prev =>
          prev!.map(n =>
            n.id === notification.id ? { ...n, is_read: true } : n
          )
        );
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Failed to mark notification as read.'
        );
        return;
      }
    }
    if (link && typeof window !== 'undefined') window.location.href = link;
  }

  async function handleMarkAllRead() {
    setError(null);
    const previous = notifications;
    setNotifications(prev => prev!.map(n => ({ ...n, is_read: true })));
    try {
      await notificationsApi.markAllRead();
    } catch (err) {
      setNotifications(previous);
      setError(
        err instanceof Error ? err.message : 'Failed to mark all as read.'
      );
    }
  }

  const hasUnread = notifications.some(n => !n.is_read);

  return (
    <div>
      <Alert variant='error'>{error}</Alert>

      <div className='page-actions'>
        <Button
          variant='secondary'
          onClick={handleMarkAllRead}
          disabled={!hasUnread}
        >
          Mark all as read
        </Button>
      </div>

      {notifications.length === 0 ? (
        <p className='empty-state'>No notifications yet.</p>
      ) : (
        <ul className='notification-list'>
          {notifications.map(notification => (
            <li key={notification.id}>
              <button
                type='button'
                className={`notification-item${
                  notification.is_read ? '' : ' notification-item-unread'
                }`}
                onClick={() => handleOpen(notification)}
              >
                {!notification.is_read && (
                  <span className='notification-dot' aria-hidden='true' />
                )}
                <span>{describeNotification(notification)}</span>
                <span className='list-item-meta'>
                  {formatRelativeTime(notification.created_at)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {pagination && pagination.totalPages > 1 && (
        <div className='pagination'>
          <Button
            variant='secondary'
            onClick={() => setPage(p => p - 1)}
            disabled={page <= 1}
          >
            Previous
          </Button>
          <span className='list-item-meta'>
            Page {pagination.page} of {pagination.totalPages}
          </span>
          <Button
            variant='secondary'
            onClick={() => setPage(p => p + 1)}
            disabled={page >= pagination.totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
