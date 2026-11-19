import type { Request, Response } from 'express';
import { analyticsService } from '../services/analytics.service.js';

export const analyticsController = {
  getAnalytics(req: Request, res: Response): void {
    res.json({
      data: analyticsService.getAnalytics(
        req.organizationId!,
        req.user!.id,
        req.organizationRole!
      )
    });
  }
};
