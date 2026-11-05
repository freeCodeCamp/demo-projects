import type { Request, Response } from 'express';
import { activityService } from '../services/activity.service.js';
import { getPaginationParams } from '../utils/pagination.js';

export const activityController = {
  listForProject(req: Request, res: Response): void {
    const pagination = getPaginationParams(req);
    res.json(activityService.listForProject(req.projectId!, pagination));
  }
};
