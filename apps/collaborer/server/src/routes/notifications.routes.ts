import { Router } from 'express';
import { notificationsController } from '../controllers/notifications.controller.js';
import { authenticate } from '../middleware/authenticate.js';

// Always implicitly scoped to req.user.id — no organization/project context needed.
export const notificationsRouter = Router();
notificationsRouter.use(authenticate);
notificationsRouter.get('/', notificationsController.list);
notificationsRouter.get('/unread-count', notificationsController.unreadCount);
notificationsRouter.post('/read-all', notificationsController.markAllRead);
notificationsRouter.post(
  '/:notificationId/read',
  notificationsController.markRead
);
