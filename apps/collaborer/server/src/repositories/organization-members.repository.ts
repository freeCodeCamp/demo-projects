import { db } from '../db/index.js';
import type {
  OrganizationMember,
  OrganizationMemberWithUser,
  OrganizationRole
} from '../models/organization-member.model.js';

const findMembershipStmt = db.prepare(
  'SELECT * FROM organization_members WHERE organization_id = ? AND user_id = ?'
);

const findByEmailStmt = db.prepare(`
  SELECT om.* FROM organization_members om
  JOIN users u ON u.id = om.user_id
  WHERE om.organization_id = ? AND u.email = ?
`);

const listStmt = db.prepare(`
  SELECT om.id, om.organization_id, om.user_id, om.role, om.created_at, u.name, u.email, u.avatar_url
  FROM organization_members om
  JOIN users u ON u.id = om.user_id
  WHERE om.organization_id = ?
  ORDER BY om.created_at ASC
  LIMIT ? OFFSET ?
`);

const countStmt = db.prepare(
  'SELECT COUNT(*) AS count FROM organization_members WHERE organization_id = ?'
);

const insertStmt = db.prepare(
  'INSERT INTO organization_members (organization_id, user_id, role) VALUES (?, ?, ?)'
);
const updateRoleStmt = db.prepare(
  'UPDATE organization_members SET role = ? WHERE organization_id = ? AND user_id = ?'
);
const removeStmt = db.prepare(
  'DELETE FROM organization_members WHERE organization_id = ? AND user_id = ?'
);

// Cleanup for the "member removed from org" edge case: unassign their tasks and drop
// their project memberships within this organization's projects. Lives here (rather
// than in a projects/tasks repository) until those layers exist in later phases.
const removeProjectMembershipsInOrgStmt = db.prepare(`
  DELETE FROM project_members
  WHERE user_id = ? AND project_id IN (SELECT id FROM projects WHERE organization_id = ?)
`);
const unassignTasksInOrgStmt = db.prepare(`
  UPDATE tasks SET assignee_id = NULL, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
  WHERE assignee_id = ? AND project_id IN (SELECT id FROM projects WHERE organization_id = ?)
`);

export const organizationMembersRepository = {
  findMembership(
    organizationId: number,
    userId: number
  ): OrganizationMember | undefined {
    return findMembershipStmt.get(organizationId, userId) as
      | OrganizationMember
      | undefined;
  },

  findByEmail(
    organizationId: number,
    email: string
  ): OrganizationMember | undefined {
    return findByEmailStmt.get(organizationId, email) as
      | OrganizationMember
      | undefined;
  },

  list(
    organizationId: number,
    limit: number,
    offset: number
  ): OrganizationMemberWithUser[] {
    return listStmt.all(
      organizationId,
      limit,
      offset
    ) as OrganizationMemberWithUser[];
  },

  count(organizationId: number): number {
    return (countStmt.get(organizationId) as { count: number }).count;
  },

  create(organizationId: number, userId: number, role: OrganizationRole): void {
    insertStmt.run(organizationId, userId, role);
  },

  updateRole(
    organizationId: number,
    userId: number,
    role: OrganizationRole
  ): void {
    updateRoleStmt.run(role, organizationId, userId);
  },

  remove(organizationId: number, userId: number): void {
    db.transaction(() => {
      removeStmt.run(organizationId, userId);
      removeProjectMembershipsInOrgStmt.run(userId, organizationId);
      unassignTasksInOrgStmt.run(userId, organizationId);
    })();
  }
};
