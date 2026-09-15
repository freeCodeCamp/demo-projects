import { formatEnumLabel } from '../../lib/utils/format.js';
import type { Notification } from './types.js';

// Shared by the dashboard's notification preview and the full notifications
// page so the two never describe/link the same notification differently.
export function describeNotification(notification: Notification): string {
  const data = notification.data;

  switch (notification.type) {
    case 'task_assigned':
      return `You were assigned "${data.taskTitle ?? 'a task'}"`;
    case 'task_status_changed':
      return `"${data.taskTitle ?? 'A task'}" changed to ${
        data.status ?? 'a new status'
      }`;
    case 'mentioned_in_comment':
      return `You were mentioned in a comment on "${
        data.taskTitle ?? 'a task'
      }"`;
    case 'comment_added':
      return `New comment on "${data.taskTitle ?? 'a task'}"`;
    case 'added_to_project':
      return `You were added to "${data.projectName ?? 'a project'}"`;
    case 'organization_invitation':
      return `You were invited to join "${
        data.organizationName ?? 'an organization'
      }"`;
    case 'organization_role_changed':
      return `Your role in "${
        data.organizationName ?? 'an organization'
      }" changed to ${
        typeof data.role === 'string'
          ? formatEnumLabel(data.role)
          : 'a new role'
      }`;
    case 'removed_from_organization':
      return `You were removed from "${
        data.organizationName ?? 'an organization'
      }"`;
    case 'removed_from_project':
      return `You were removed from "${data.projectName ?? 'a project'}"`;
    default:
      return 'New notification';
  }
}

// Where clicking a notification should take you — null when there's nowhere
// sensible to go (falls back to just marking it read in place).
export function notificationLink(notification: Notification): string | null {
  const data = notification.data;

  switch (notification.type) {
    case 'task_assigned':
    case 'task_status_changed':
    case 'mentioned_in_comment':
    case 'comment_added':
      return typeof data.taskId === 'number' ? `/tasks/${data.taskId}` : null;
    case 'added_to_project':
      return typeof data.projectId === 'number'
        ? `/projects/${data.projectId}`
        : null;
    case 'organization_invitation':
      return typeof data.invitationToken === 'string'
        ? `/invitations/${data.invitationToken}`
        : null;
    case 'organization_role_changed':
      return '/organization/members';
    case 'removed_from_organization':
    case 'removed_from_project':
      // The org/project is no longer accessible to them — nowhere sensible
      // to deep-link, so fall back to the dashboard.
      return '/dashboard';
    default:
      return null;
  }
}
