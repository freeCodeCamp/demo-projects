import { db } from '../db/index.js';
import type { Invitation, InvitationRole } from '../models/invitation.model.js';

const insertStmt = db.prepare(`
  INSERT INTO invitations (organization_id, email, role, token, invited_by, expires_at)
  VALUES (@organizationId, @email, @role, @token, @invitedBy, @expiresAt)
`);

const findByIdStmt = db.prepare('SELECT * FROM invitations WHERE id = ?');
const findByTokenStmt = db.prepare('SELECT * FROM invitations WHERE token = ?');

const findPendingByOrgAndEmailStmt = db.prepare(
  'SELECT * FROM invitations WHERE organization_id = ? AND email = ? AND accepted_at IS NULL'
);

const listPendingByOrganizationStmt = db.prepare(
  'SELECT * FROM invitations WHERE organization_id = ? AND accepted_at IS NULL ORDER BY created_at DESC'
);

const markAcceptedStmt = db.prepare(
  "UPDATE invitations SET accepted_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now') WHERE id = ?"
);

export const invitationsRepository = {
  create(input: {
    organizationId: number;
    email: string;
    role: InvitationRole;
    token: string;
    invitedBy: number;
    expiresAt: string;
  }): Invitation {
    const result = insertStmt.run(input);
    return findByIdStmt.get(result.lastInsertRowid) as Invitation;
  },

  findByToken(token: string): Invitation | undefined {
    return findByTokenStmt.get(token) as Invitation | undefined;
  },

  findPendingByOrganizationAndEmail(
    organizationId: number,
    email: string
  ): Invitation | undefined {
    return findPendingByOrgAndEmailStmt.get(organizationId, email) as
      | Invitation
      | undefined;
  },

  listPendingByOrganization(organizationId: number): Invitation[] {
    return listPendingByOrganizationStmt.all(organizationId) as Invitation[];
  },

  markAccepted(id: number): void {
    markAcceptedStmt.run(id);
  }
};
