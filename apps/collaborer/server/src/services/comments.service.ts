import { db } from '../db/index.js';
import type { Comment } from '../models/comment.model.js';
import { commentsRepository } from '../repositories/comments.repository.js';
import { tasksRepository } from '../repositories/tasks.repository.js';
import { usersRepository } from '../repositories/users.repository.js';
import { hasProjectAccess } from '../utils/access.js';
import { ForbiddenError, NotFoundError } from '../utils/errors.js';
import { extractMentionedUsernames } from '../utils/mentions.js';
import {
  buildPaginatedResult,
  type PaginationParams
} from '../utils/pagination.js';
import { broadcast } from '../websocket/broadcast.js';
import { activityService } from './activity.service.js';
import { notificationsService } from './notifications.service.js';

export const commentsService = {
  create(
    taskId: number,
    projectId: number,
    organizationId: number,
    authorId: number,
    body: string
  ): Comment {
    const task = tasksRepository.findById(taskId);
    if (!task) throw new NotFoundError('TASK_NOT_FOUND', 'Task not found.');

    const createdComment = db.transaction(() => {
      const comment = commentsRepository.create(taskId, authorId, body);

      activityService.record({
        organizationId,
        projectId,
        actorId: authorId,
        action: 'comment.created',
        entityType: 'comment',
        entityId: comment.id,
        metadata: { taskId, taskTitle: task.title }
      });

      // Resolve @mentions against real users who actually have access to this
      // project — per the Edge Case Decisions doc, anyone else is left as plain
      // text with no notification.
      const mentionedUserIds = new Set<number>();
      for (const username of extractMentionedUsernames(body)) {
        const user = usersRepository.findByUsername(username);
        if (!user || user.id === authorId) continue;
        if (!hasProjectAccess(projectId, organizationId, user.id)) continue;

        mentionedUserIds.add(user.id);
        notificationsService.notify(user.id, 'mentioned_in_comment', {
          taskId,
          taskTitle: task.title,
          commentId: comment.id
        });
      }

      // "Someone commenting on a task they are involved with" (PRD §13) — the
      // task's creator and assignee, excluding the author and anyone who already
      // got the more specific mention notification above.
      const involvedUserIds = new Set<number>([task.creator_id]);
      if (task.assignee_id) involvedUserIds.add(task.assignee_id);
      involvedUserIds.delete(authorId);
      for (const id of mentionedUserIds) involvedUserIds.delete(id);

      for (const userId of involvedUserIds) {
        notificationsService.notify(userId, 'comment_added', {
          taskId,
          taskTitle: task.title,
          commentId: comment.id
        });
      }

      return comment;
    })();

    broadcast.commentCreated(projectId, taskId, createdComment);

    return createdComment;
  },

  listForTask(taskId: number, pagination: PaginationParams) {
    const comments = commentsRepository.listByTask(
      taskId,
      pagination.limit,
      pagination.offset
    );
    const total = commentsRepository.countByTask(taskId);
    return buildPaginatedResult(comments, total, pagination);
  },

  update(commentId: number, requestingUserId: number, body: string): Comment {
    const comment = commentsRepository.findById(commentId);
    if (!comment)
      throw new NotFoundError('COMMENT_NOT_FOUND', 'Comment not found.');
    if (comment.author_id !== requestingUserId) {
      throw new ForbiddenError('You can only edit your own comments.');
    }

    return commentsRepository.update(commentId, body);
  },

  remove(commentId: number, requestingUserId: number): void {
    const comment = commentsRepository.findById(commentId);
    if (!comment)
      throw new NotFoundError('COMMENT_NOT_FOUND', 'Comment not found.');
    if (comment.author_id !== requestingUserId) {
      throw new ForbiddenError('You can only delete your own comments.');
    }

    commentsRepository.remove(commentId);
  }
};
