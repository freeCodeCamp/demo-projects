import { Router } from 'express';
import { projectsController } from '../controllers/projects.controller.js';
import { authenticate } from '../middleware/authenticate.js';
import {
  requireOrganizationRole,
  requireProjectManageAccess,
  requireProjectViewAccess
} from '../middleware/authorize.js';
import { projectActivityRouter } from './activity.routes.js';
import { projectLabelsRouter } from './labels.routes.js';
import { projectMembersRouter } from './project-members.routes.js';
import { projectTasksRouter } from './tasks.routes.js';

// Mounted at /organizations/:organizationId/projects — creation and listing need
// the org id up front (listing is filtered by role inside the service).
export const organizationProjectsRouter = Router({ mergeParams: true });
organizationProjectsRouter.post(
  '/',
  requireOrganizationRole('admin'),
  projectsController.create
);
organizationProjectsRouter.get(
  '/',
  requireOrganizationRole('member'),
  projectsController.listForOrganization
);

// Mounted at the top level, /projects — individual project resources by ID. The
// project's organization is resolved server-side, so no :organizationId needed here.
export const projectsRouter = Router();
projectsRouter.use(authenticate);
projectsRouter.get(
  '/:projectId',
  requireProjectViewAccess,
  projectsController.getById
);
projectsRouter.patch(
  '/:projectId',
  requireProjectManageAccess,
  projectsController.update
);
projectsRouter.delete(
  '/:projectId',
  requireProjectManageAccess,
  projectsController.remove
);
projectsRouter.use('/:projectId/members', projectMembersRouter);
projectsRouter.use('/:projectId/tasks', projectTasksRouter);
projectsRouter.use('/:projectId/labels', projectLabelsRouter);
projectsRouter.use('/:projectId/activity', projectActivityRouter);
