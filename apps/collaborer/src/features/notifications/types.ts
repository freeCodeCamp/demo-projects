export type NotificationType =
  | 'organization_invitation'
  | 'organization_role_changed'
  | 'removed_from_organization'
  | 'added_to_project'
  | 'removed_from_project'
  | 'task_assigned'
  | 'task_status_changed'
  | 'mentioned_in_comment'
  | 'comment_added';

export interface Notification {
  id: number;
  user_id: number;
  type: NotificationType;
  data: Record<string, unknown>;
  is_read: boolean;
  created_at: string;
}
