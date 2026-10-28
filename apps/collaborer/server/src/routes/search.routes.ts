import { Router } from 'express';
import { searchController } from '../controllers/search.controller.js';
import { requireOrganizationRole } from '../middleware/authorize.js';

// Mounted at /organizations/:organizationId/search — search is scoped to one
// organization at a time (matching the org-switcher model in PRD §5) rather than
// aggregating across every org the user belongs to.
export const organizationSearchRouter = Router({ mergeParams: true });
organizationSearchRouter.get(
  '/',
  requireOrganizationRole('member'),
  searchController.search
);
