import { Router } from 'express';
import { projectMembersController } from '../controllers/project-members.controller.js';
import {
  requireProjectManageAccess,
  requireProjectViewAccess
} from '../middleware/authorize.js';

// Mounted at /projects/:projectId/members — mergeParams lets it see projectId.
export const projectMembersRouter = Router({ mergeParams: true });

projectMembersRouter.get(
  '/',
  requireProjectViewAccess,
  projectMembersController.list
);
projectMembersRouter.post(
  '/',
  requireProjectManageAccess,
  projectMembersController.add
);
projectMembersRouter.delete(
  '/:userId',
  requireProjectManageAccess,
  projectMembersController.remove
);
