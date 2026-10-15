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

export interface LabelRef {
  id: number;
  name: string;
  color: string;
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

export interface TaskAssignedToMe extends Task {
  project_name: string;
  organization_id: number;
  subtask_total: number;
  subtask_completed: number;
}

export interface CreateTaskInput {
  title: string;
  description?: string | null;
  status?: TaskStatus;
  priority?: TaskPriority;
  assigneeId?: number | null;
  dueDate?: string | null;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string | null;
  status?: TaskStatus;
  priority?: TaskPriority;
  assigneeId?: number | null;
  dueDate?: string | null;
}

export interface Subtask {
  id: number;
  task_id: number;
  title: string;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

export interface Attachment {
  id: number;
  task_id: number;
  filename: string;
  storage_key: string;
  mime_type: string;
  size: number;
  uploaded_by: number;
  created_at: string;
  uploader_name: string;
}
