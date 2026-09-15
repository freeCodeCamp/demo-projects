import { Router } from 'express';
import { organizationsController } from '../controllers/organizations.controller.js';
import { authenticate } from '../middleware/authenticate.js';
import { requireOrganizationRole } from '../middleware/authorize.js';
import { organizationAnalyticsRouter } from './analytics.routes.js';
import { organizationInvitationsRouter } from './invitations.routes.js';
import { organizationMembersRouter } from './organization-members.routes.js';
import { organizationProjectsRouter } from './projects.routes.js';
import { organizationSearchRouter } from './search.routes.js';

export const organizationsRouter = Router();

organizationsRouter.use(authenticate);

organizationsRouter.post('/', organizationsController.create);
organizationsRouter.get('/', organizationsController.listMine);
organizationsRouter.get(
  '/:organizationId',
  requireOrganizationRole('member'),
  organizationsController.getById
);
organizationsRouter.patch(
  '/:organizationId',
  requireOrganizationRole('admin'),
  organizationsController.update
);
organizationsRouter.delete(
  '/:organizationId',
  requireOrganizationRole('owner'),
  organizationsController.remove
);

organizationsRouter.use('/:organizationId/members', organizationMembersRouter);
organizationsRouter.use(
  '/:organizationId/invitations',
  organizationInvitationsRouter
);
organizationsRouter.use(
  '/:organizationId/projects',
  organizationProjectsRouter
);
organizationsRouter.use('/:organizationId/search', organizationSearchRouter);
organizationsRouter.use(
  '/:organizationId/analytics',
  organizationAnalyticsRouter
);
