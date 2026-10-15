import { Router } from 'express';
import { labelsController } from '../controllers/labels.controller.js';
import { authenticate } from '../middleware/authenticate.js';
import {
  requireLabelAccess,
  requireProjectViewAccess
} from '../middleware/authorize.js';

// Mounted at /projects/:projectId/labels
export const projectLabelsRouter = Router({ mergeParams: true });
projectLabelsRouter.post(
  '/',
  requireProjectViewAccess,
  labelsController.create
);
projectLabelsRouter.get(
  '/',
  requireProjectViewAccess,
  labelsController.listForProject
);

// Mounted at the top level, /labels — individual label resources by ID.
export const labelsRouter = Router();
labelsRouter.use(authenticate);
labelsRouter.use('/:labelId', requireLabelAccess);
labelsRouter.patch('/:labelId', labelsController.update);
labelsRouter.delete('/:labelId', labelsController.remove);
