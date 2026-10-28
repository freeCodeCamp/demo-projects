import { apiFetch, type PaginatedResult } from '../../lib/api/client.js';
import type {
  Attachment,
  CreateTaskInput,
  Subtask,
  Task,
  TaskAssignedToMe,
  TaskListItem,
  UpdateTaskInput
} from './types.js';

export const tasksApi = {
  async listAssignedToMe(): Promise<TaskAssignedToMe[]> {
    const { data } = await apiFetch<{ data: TaskAssignedToMe[] }>(
      '/users/me/tasks'
    );
    return data;
  },

  // The Kanban board groups tasks into columns client-side, so it needs every
  // task for the project in one shot rather than paginating per status.
  async listForProject(
    projectId: number,
    limit = 100
  ): Promise<TaskListItem[]> {
    const { data } = await apiFetch<PaginatedResult<TaskListItem>>(
      `/projects/${projectId}/tasks?limit=${limit}`
    );
    return data;
  },

  async getById(taskId: number): Promise<TaskListItem> {
    const { data } = await apiFetch<{ data: TaskListItem }>(`/tasks/${taskId}`);
    return data;
  },

  // Create/update return the bare Task (no labels/assignee-name/subtask counts
  // — those come from the enriched list/detail endpoints only). Callers that
  // need the full TaskListItem shape merge these fields into what they already
  // have rather than refetching.
  async create(projectId: number, input: CreateTaskInput): Promise<Task> {
    const { data } = await apiFetch<{ data: Task }>(
      `/projects/${projectId}/tasks`,
      {
        method: 'POST',
        body: input
      }
    );
    return data;
  },

  async update(taskId: number, input: UpdateTaskInput): Promise<Task> {
    const { data } = await apiFetch<{ data: Task }>(`/tasks/${taskId}`, {
      method: 'PATCH',
      body: input
    });
    return data;
  },

  remove(taskId: number): Promise<void> {
    return apiFetch<void>(`/tasks/${taskId}`, { method: 'DELETE' });
  },

  attachLabel(taskId: number, labelId: number): Promise<void> {
    return apiFetch<void>(`/tasks/${taskId}/labels`, {
      method: 'POST',
      body: { labelId }
    });
  },

  detachLabel(taskId: number, labelId: number): Promise<void> {
    return apiFetch<void>(`/tasks/${taskId}/labels/${labelId}`, {
      method: 'DELETE'
    });
  },

  async listSubtasks(taskId: number): Promise<Subtask[]> {
    const { data } = await apiFetch<{ data: Subtask[] }>(
      `/tasks/${taskId}/subtasks`
    );
    return data;
  },

  async createSubtask(taskId: number, title: string): Promise<Subtask> {
    const { data } = await apiFetch<{ data: Subtask }>(
      `/tasks/${taskId}/subtasks`,
      {
        method: 'POST',
        body: { title }
      }
    );
    return data;
  },

  async updateSubtask(
    taskId: number,
    subtaskId: number,
    input: { title?: string; isCompleted?: boolean }
  ): Promise<Subtask> {
    const { data } = await apiFetch<{ data: Subtask }>(
      `/tasks/${taskId}/subtasks/${subtaskId}`,
      {
        method: 'PATCH',
        body: input
      }
    );
    return data;
  },

  removeSubtask(taskId: number, subtaskId: number): Promise<void> {
    return apiFetch<void>(`/tasks/${taskId}/subtasks/${subtaskId}`, {
      method: 'DELETE'
    });
  },

  async listAttachments(taskId: number): Promise<Attachment[]> {
    const { data } = await apiFetch<{ data: Attachment[] }>(
      `/tasks/${taskId}/attachments`
    );
    return data;
  },

  async uploadAttachment(taskId: number, file: File): Promise<Attachment> {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await apiFetch<{ data: Attachment }>(
      `/tasks/${taskId}/attachments`,
      {
        method: 'POST',
        body: formData
      }
    );
    return data;
  },

  removeAttachment(attachmentId: number): Promise<void> {
    return apiFetch<void>(`/attachments/${attachmentId}`, { method: 'DELETE' });
  }
};
