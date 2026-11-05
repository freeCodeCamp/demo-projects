import { Router } from 'express';
import { subtasksController } from '../controllers/subtasks.controller.js';

// Mounted at /tasks/:taskId/subtasks. requireTaskAccess has already run on the
// parent tasksRouter for the whole /:taskId/* prefix, so no separate check here.
export const subtasksRouter = Router({ mergeParams: true });

subtasksRouter.get('/', subtasksController.list);
subtasksRouter.post('/', subtasksController.create);
subtasksRouter.patch('/:subtaskId', subtasksController.update);
subtasksRouter.delete('/:subtaskId', subtasksController.remove);
