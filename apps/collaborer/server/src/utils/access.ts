import { organizationMembersRepository } from '../repositories/organization-members.repository.js';
import { projectMembersRepository } from '../repositories/project-members.repository.js';

// Business-logic version of the "org manager implicit / plain member needs explicit
// project membership" rule enforced by requireProjectViewAccess and friends in
// middleware/authorize.ts. Used where a service needs to validate a *different*
// user's access (e.g. "can this task be assigned to them?", "can this mention be
// resolved?") rather than gate the current request.
export function hasProjectAccess(
  projectId: number,
  organizationId: number,
  userId: number
): boolean {
  const membership = organizationMembersRepository.findMembership(
    organizationId,
    userId
  );
  if (!membership) return false;

  const isOrgManager =
    membership.role === 'owner' || membership.role === 'admin';
  return isOrgManager || projectMembersRepository.isMember(projectId, userId);
}
