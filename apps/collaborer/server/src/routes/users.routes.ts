import { Router } from 'express';
import { usersController } from '../controllers/users.controller.js';
import { authenticate } from '../middleware/authenticate.js';

export const usersRouter = Router();

usersRouter.use(authenticate);
usersRouter.get('/me', usersController.getMe);
usersRouter.patch('/me', usersController.updateMe);
usersRouter.get('/me/tasks', usersController.getMyTasks);
