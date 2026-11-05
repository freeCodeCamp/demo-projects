import { db } from '../db/index.js';
import type { LabelRef } from '../models/label.model.js';
import type {
  Task,
  TaskAssignedToUser,
  TaskListItem,
  TaskPriority,
  TaskStatus,
  TaskWithAssignee
} from '../models/task.model.js';
import { attachmentsRepository } from '../repositories/attachments.repository.js';
import { labelsRepository } from '../repositories/labels.repository.js';
import { organizationMembersRepository } from '../repositories/organization-members.repository.js';
import { projectMembersRepository } from '../repositories/project-members.repository.js';
import { taskLabelsRepository } from '../repositories/task-labels.repository.js';
import {
  tasksRepository,
  type SortOrder,
  type TaskFilters,
  type TaskSortField
} from '../repositories/tasks.repository.js';
import { storage } from '../storage/index.js';
import { broadcast } from '../websocket/broadcast.js';
import { activityService } from './activity.service.js';
import {
  BadRequestError,
  ConflictError,
  NotFoundError
} from '../utils/errors.js';
import {
  buildPaginatedResult,
  type PaginationParams
} from '../utils/pagination.js';
import { notificationsService } from './notifications.service.js';

function assertAssigneeHasProjectAccess(
  projectId: number,
  organizationId: number,
  assigneeId: number
): void {
  const membership = organizationMembersRepository.findMembership(
    organizationId,
    assigneeId
  );
  if (!membership) {
    throw new BadRequestError(
      'INVALID_ASSIGNEE',
      'The assignee must be a member of the organization.'
    );
  }

  const isOrgManager =
    membership.role === 'owner' || membership.role === 'admin';
  if (
    !isOrgManager &&
    !projectMembersRepository.isMember(projectId, assigneeId)
  ) {
    throw new BadRequestError(
      'INVALID_ASSIGNEE',
      'The assignee must have access to this project.'
    );
  }
}

function attachLabels(rows: TaskWithAssignee[]): TaskListItem[] {
  const labelRows = labelsRepository.listForTasks(rows.map(row => row.id));
  const byTask = new Map<number, LabelRef[]>();

  for (const { task_id, ...label } of labelRows) {
    const list = byTask.get(task_id) ?? [];
    list.push(label);
    byTask.set(task_id, list);
  }

  return rows.map(row => ({ ...row, labels: byTask.get(row.id) ?? [] }));
}

export const tasksService = {
  create(
    projectId: number,
    organizationId: number,
    creatorId: number,
    input: {
      title: string;
      description?: string | null;
      status?: TaskStatus;
      priority?: TaskPriority;
      assigneeId?: number | null;
      dueDate?: string | null;
    }
  ): Task {
    if (input.assigneeId) {
      assertAssigneeHasProjectAccess(
        projectId,
        organizationId,
        input.assigneeId
      );
    }

    return db.transaction(() => {
      const task = tasksRepository.create({
        projectId,
        title: input.title,
        description: input.description ?? null,
        status: input.status ?? 'backlog',
        priority: input.priority ?? 'medium',
        assigneeId: input.assigneeId ?? null,
        creatorId,
        dueDate: input.dueDate ?? null
      });

      activityService.record({
        organizationId,
        projectId,
        actorId: creatorId,
        action: 'task.created',
        entityType: 'task',
        entityId: task.id,
        metadata: { title: task.title }
      });

      if (task.assignee_id && task.assignee_id !== creatorId) {
        notificationsService.notify(task.assignee_id, 'task_assigned', {
          taskId: task.id,
          taskTitle: task.title
        });
      }

      return task;
    })();
  },

  list(
    projectId: number,
    filters: TaskFilters,
    sort: { field: TaskSortField; order: SortOrder },
    pagination: PaginationParams
  ) {
    const { rows, total } = tasksRepository.list(
      projectId,
      filters,
      sort,
      pagination
    );
    return buildPaginatedResult(attachLabels(rows), total, pagination);
  },

  getById(taskId: number): TaskListItem {
    const task = tasksRepository.findByIdWithAssignee(taskId);
    if (!task) throw new NotFoundError('TASK_NOT_FOUND', 'Task not found.');
    return attachLabels([task])[0]!;
  },

  update(
    taskId: number,
    projectId: number,
    organizationId: number,
    actorId: number,
    input: {
      title?: string;
      description?: string | null;
      status?: TaskStatus;
      priority?: TaskPriority;
      assigneeId?: number | null;
      dueDate?: string | null;
    }
  ): Task {
    const existing = tasksRepository.findById(taskId);
    if (!existing) throw new NotFoundError('TASK_NOT_FOUND', 'Task not found.');

    if (input.assigneeId) {
      assertAssigneeHasProjectAccess(
        projectId,
        organizationId,
        input.assigneeId
      );
    }

    const statusChanged = Boolean(
      input.status && input.status !== existing.status
    );

    const updatedTask = db.transaction(() => {
      const updated = tasksRepository.update(taskId, {
        title: input.title ?? existing.title,
        description:
          input.description !== undefined
            ? input.description
            : existing.description,
        status: input.status ?? existing.status,
        priority: input.priority ?? existing.priority,
        assigneeId:
          input.assigneeId !== undefined
            ? input.assigneeId
            : existing.assignee_id,
        dueDate: input.dueDate !== undefined ? input.dueDate : existing.due_date
      });

      if (input.status && input.status !== existing.status) {
        activityService.record({
          organizationId,
          projectId,
          actorId,
          action: 'task.status_changed',
          entityType: 'task',
          entityId: taskId,
          metadata: {
            title: existing.title,
            from: existing.status,
            to: input.status
          }
        });

        if (existing.assignee_id && existing.assignee_id !== actorId) {
          notificationsService.notify(
            existing.assignee_id,
            'task_status_changed',
            {
              taskId,
              taskTitle: existing.title,
              status: input.status
            }
          );
        }
      }

      if (input.priority && input.priority !== existing.priority) {
        activityService.record({
          organizationId,
          projectId,
          actorId,
          action: 'task.priority_changed',
          entityType: 'task',
          entityId: taskId,
          metadata: {
            title: existing.title,
            from: existing.priority,
            to: input.priority
          }
        });
      }

      if (
        input.assigneeId !== undefined &&
        input.assigneeId !== existing.assignee_id
      ) {
        activityService.record({
          organizationId,
          projectId,
          actorId,
          action: 'task.assigned',
          entityType: 'task',
          entityId: taskId,
          metadata: { title: existing.title, assigneeId: input.assigneeId }
        });

        if (input.assigneeId && input.assigneeId !== actorId) {
          notificationsService.notify(input.assigneeId, 'task_assigned', {
            taskId,
            taskTitle: existing.title
          });
        }
      }

      return updated;
    })();

    if (statusChanged) {
      broadcast.taskStatusChanged(projectId, updatedTask);
    }

    return updatedTask;
  },

  // Async because it also cleans up the task's attachment files, which live
  // outside SQLite — the DB rows cascade-delete automatically via FK, but the
  // files on disk don't, so they're fetched and removed before the task row goes.
  async remove(taskId: number): Promise<void> {
    const attachments = attachmentsRepository.listByTask(taskId);
    tasksRepository.remove(taskId);
    await Promise.all(
      attachments.map(attachment => storage.delete(attachment.storage_key))
    );
  },

  attachLabel(taskId: number, projectId: number, labelId: number): void {
    const label = labelsRepository.findById(labelId);
    if (!label || label.project_id !== projectId) {
      throw new NotFoundError(
        'LABEL_NOT_FOUND',
        'Label not found in this project.'
      );
    }

    if (taskLabelsRepository.isAttached(taskId, labelId)) {
      throw new ConflictError(
        'LABEL_ALREADY_ATTACHED',
        'This label is already attached to the task.'
      );
    }

    taskLabelsRepository.attach(taskId, labelId);
  },

  listAssignedToUser(userId: number): TaskAssignedToUser[] {
    return tasksRepository.findAssignedToUser(userId);
  },

  detachLabel(taskId: number, labelId: number): void {
    if (!taskLabelsRepository.isAttached(taskId, labelId)) {
      throw new NotFoundError(
        'LABEL_NOT_ATTACHED',
        'This label is not attached to the task.'
      );
    }

    taskLabelsRepository.detach(taskId, labelId);
  }
};
