import { Router } from 'express';
import { analyticsController } from '../controllers/analytics.controller.js';
import { requireOrganizationRole } from '../middleware/authorize.js';

export const organizationAnalyticsRouter = Router({ mergeParams: true });
organizationAnalyticsRouter.get(
  '/',
  requireOrganizationRole('member'),
  analyticsController.getAnalytics
);
