import { Router } from 'express';
import { organizationMembersController } from '../controllers/organization-members.controller.js';
import { requireOrganizationRole } from '../middleware/authorize.js';

// Mounted at /organizations/:organizationId/members — mergeParams lets it see organizationId.
export const organizationMembersRouter = Router({ mergeParams: true });

organizationMembersRouter.get(
  '/',
  requireOrganizationRole('member'),
  organizationMembersController.list
);
organizationMembersRouter.patch(
  '/:userId',
  requireOrganizationRole('admin'),
  organizationMembersController.changeRole
);
organizationMembersRouter.delete(
  '/:userId',
  requireOrganizationRole('admin'),
  organizationMembersController.remove
);
