import type { LabelRef } from './label.model.js';

export type TaskStatus =
  | 'backlog'
  | 'todo'
  | 'in_progress'
  | 'in_review'
  | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Task {
  id: number;
  project_id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  assignee_id: number | null;
  creator_id: number;
  due_date: string | null;
  created_at: string;
  updated_at: string;
}

export interface TaskWithAssignee extends Task {
  assignee_name: string | null;
  assignee_avatar_url: string | null;
  subtask_total: number;
  subtask_completed: number;
}

export interface TaskListItem extends TaskWithAssignee {
  labels: LabelRef[];
}

export interface TaskAssignedToUser extends Task {
  project_name: string;
  organization_id: number;
  subtask_total: number;
  subtask_completed: number;
}
