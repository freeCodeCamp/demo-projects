import type { Subtask } from '../models/subtask.model.js';
import { subtasksRepository } from '../repositories/subtasks.repository.js';
import { NotFoundError } from '../utils/errors.js';

export const subtasksService = {
  create(taskId: number, title: string): Subtask {
    return subtasksRepository.create(taskId, title);
  },

  listForTask(taskId: number): Subtask[] {
    return subtasksRepository.listByTask(taskId);
  },

  update(
    taskId: number,
    subtaskId: number,
    input: { title?: string; isCompleted?: boolean }
  ): Subtask {
    const existing = subtasksRepository.findById(subtaskId);
    // Confirm the subtask actually belongs to the task named in the URL — requireTaskAccess
    // only verified taskId, not that subtaskId isn't from some other (inaccessible) task.
    if (!existing || existing.task_id !== taskId) {
      throw new NotFoundError('SUBTASK_NOT_FOUND', 'Subtask not found.');
    }

    return subtasksRepository.update(
      subtaskId,
      input.title ?? existing.title,
      input.isCompleted ?? existing.is_completed
    );
  },

  remove(taskId: number, subtaskId: number): void {
    const existing = subtasksRepository.findById(subtaskId);
    if (!existing || existing.task_id !== taskId) {
      throw new NotFoundError('SUBTASK_NOT_FOUND', 'Subtask not found.');
    }

    subtasksRepository.remove(subtaskId);
  }
};
