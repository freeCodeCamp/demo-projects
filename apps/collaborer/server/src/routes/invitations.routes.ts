import { Router } from 'express';
import { invitationsController } from '../controllers/invitations.controller.js';
import { authenticate } from '../middleware/authenticate.js';
import { requireOrganizationRole } from '../middleware/authorize.js';

// Mounted at /organizations/:organizationId/invitations — admin/owner only.
export const organizationInvitationsRouter = Router({ mergeParams: true });
organizationInvitationsRouter.post(
  '/',
  requireOrganizationRole('admin'),
  invitationsController.create
);
organizationInvitationsRouter.get(
  '/',
  requireOrganizationRole('admin'),
  invitationsController.listPending
);

// Mounted at the top level, /invitations — token-based, not org-scoped by URL.
// GET is intentionally public (an unregistered invitee needs to see who invited them
// before they have an account); accepting requires being logged in.
export const invitationsRouter = Router();
invitationsRouter.get('/:token', invitationsController.getByToken);
invitationsRouter.post(
  '/:token/accept',
  authenticate,
  invitationsController.accept
);
