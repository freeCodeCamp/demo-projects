import type { Request, Response } from 'express';
import { notificationsService } from '../services/notifications.service.js';
import { getPaginationParams } from '../utils/pagination.js';
import { NotFoundError } from '../utils/errors.js';

export const notificationsController = {
  list(req: Request, res: Response): void {
    const pagination = getPaginationParams(req);
    res.json(notificationsService.list(req.user!.id, pagination));
  },

  unreadCount(req: Request, res: Response): void {
    res.json({
      data: { count: notificationsService.unreadCount(req.user!.id) }
    });
  },

  markRead(req: Request, res: Response): void {
    const notificationId = Number(req.params.notificationId);
    if (!Number.isInteger(notificationId)) {
      throw new NotFoundError(
        'NOTIFICATION_NOT_FOUND',
        'Notification not found.'
      );
    }
    notificationsService.markRead(notificationId, req.user!.id);
    res.status(204).send();
  },

  markAllRead(req: Request, res: Response): void {
    notificationsService.markAllRead(req.user!.id);
    res.status(204).send();
  }
};
