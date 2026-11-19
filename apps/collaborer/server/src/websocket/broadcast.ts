import type { Comment } from '../models/comment.model.js';
import type { Task } from '../models/task.model.js';
import { WS_EVENTS } from './events.js';
import { broadcastToProject } from './server.js';

// Called by services *after* their db.transaction() has committed — never from
// inside one — per the architecture doc's "persist important state before
// broadcasting the event." Scoped narrowly to what the roadmap calls for: Kanban
// status moves and new comments, not every field edit.
export const broadcast = {
  taskStatusChanged(projectId: number, task: Task): void {
    broadcastToProject(projectId, { type: WS_EVENTS.TASK_UPDATED, data: task });
  },

  commentCreated(projectId: number, taskId: number, comment: Comment): void {
    broadcastToProject(projectId, {
      type: WS_EVENTS.COMMENT_CREATED,
      data: { taskId, comment }
    });
  }
};
