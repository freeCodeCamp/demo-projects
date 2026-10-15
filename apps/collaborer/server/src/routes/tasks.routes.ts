import { Router } from 'express';
import { tasksController } from '../controllers/tasks.controller.js';
import { authenticate } from '../middleware/authenticate.js';
import {
  requireProjectViewAccess,
  requireTaskAccess
} from '../middleware/authorize.js';
import { taskAttachmentsRouter } from './attachments.routes.js';
import { taskCommentsRouter } from './comments.routes.js';
import { subtasksRouter } from './subtasks.routes.js';

// Mounted at /projects/:projectId/tasks — creation and the filtered/sorted/paginated
// list live here since they operate on "all tasks in this project".
export const projectTasksRouter = Router({ mergeParams: true });
projectTasksRouter.post('/', requireProjectViewAccess, tasksController.create);
projectTasksRouter.get('/', requireProjectViewAccess, tasksController.list);

// Mounted at the top level, /tasks — individual task resources by ID. requireTaskAccess
// is applied once for the whole /:taskId prefix, covering labels and subtasks too.
export const tasksRouter = Router();
tasksRouter.use(authenticate);
tasksRouter.use('/:taskId', requireTaskAccess);
tasksRouter.get('/:taskId', tasksController.getById);
tasksRouter.patch('/:taskId', tasksController.update);
tasksRouter.delete('/:taskId', tasksController.remove);
tasksRouter.post('/:taskId/labels', tasksController.attachLabel);
tasksRouter.delete('/:taskId/labels/:labelId', tasksController.detachLabel);
tasksRouter.use('/:taskId/subtasks', subtasksRouter);
tasksRouter.use('/:taskId/comments', taskCommentsRouter);
tasksRouter.use('/:taskId/attachments', taskAttachmentsRouter);
