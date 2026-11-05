import { apiFetch, type PaginatedResult } from '../../lib/api/client.js';
import type { Comment } from './types.js';

export const commentsApi = {
  listForTask(taskId: number, page = 1): Promise<PaginatedResult<Comment>> {
    return apiFetch<PaginatedResult<Comment>>(
      `/tasks/${taskId}/comments?page=${page}`
    );
  },

  async create(taskId: number, body: string): Promise<Comment> {
    const { data } = await apiFetch<{ data: Comment }>(
      `/tasks/${taskId}/comments`,
      {
        method: 'POST',
        body: { body }
      }
    );
    return data;
  },

  async update(commentId: number, body: string): Promise<Comment> {
    const { data } = await apiFetch<{ data: Comment }>(
      `/comments/${commentId}`,
      { method: 'PATCH', body: { body } }
    );
    return data;
  },

  remove(commentId: number): Promise<void> {
    return apiFetch<void>(`/comments/${commentId}`, { method: 'DELETE' });
  }
};
