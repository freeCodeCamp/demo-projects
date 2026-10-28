import { Router } from 'express';
import { commentsController } from '../controllers/comments.controller.js';
import { authenticate } from '../middleware/authenticate.js';
import { requireCommentAccess } from '../middleware/authorize.js';

// Mounted at /tasks/:taskId/comments. requireTaskAccess has already run on the
// parent tasksRouter for the whole /:taskId/* prefix, so no separate check here.
export const taskCommentsRouter = Router({ mergeParams: true });
taskCommentsRouter.post('/', commentsController.create);
taskCommentsRouter.get('/', commentsController.list);

// Mounted at the top level, /comments — individual comment resources by ID.
// Author-only editing/deleting is enforced in the service, not here.
export const commentsRouter = Router();
commentsRouter.use(authenticate);
commentsRouter.use('/:commentId', requireCommentAccess);
commentsRouter.patch('/:commentId', commentsController.update);
commentsRouter.delete('/:commentId', commentsController.remove);
