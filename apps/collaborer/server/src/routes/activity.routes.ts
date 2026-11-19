import { Router } from 'express';
import { activityController } from '../controllers/activity.controller.js';
import { requireProjectViewAccess } from '../middleware/authorize.js';

// Mounted at /projects/:projectId/activity — any project participant can view it,
// same access tier as viewing the project's tasks.
export const projectActivityRouter = Router({ mergeParams: true });
projectActivityRouter.get(
  '/',
  requireProjectViewAccess,
  activityController.listForProject
);
