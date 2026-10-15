import { db } from '../db/index.js';
import type { Organization } from '../models/organization.model.js';

const insertOrganizationStmt = db.prepare(
  'INSERT INTO organizations (name, description, owner_id) VALUES (@name, @description, @ownerId)'
);
const addOwnerMembershipStmt = db.prepare(
  "INSERT INTO organization_members (organization_id, user_id, role) VALUES (?, ?, 'owner')"
);
const findByIdStmt = db.prepare('SELECT * FROM organizations WHERE id = ?');
const listForUserStmt = db.prepare(`
  SELECT o.* FROM organizations o
  JOIN organization_members om ON om.organization_id = o.id
  WHERE om.user_id = ?
  ORDER BY o.created_at ASC
`);
const updateStmt = db.prepare(`
  UPDATE organizations
  SET name = @name, description = @description, logo_url = @logoUrl, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
  WHERE id = @id
`);
const updateOwnerStmt = db.prepare(
  'UPDATE organizations SET owner_id = ? WHERE id = ?'
);
const deleteStmt = db.prepare('DELETE FROM organizations WHERE id = ?');

export const organizationsRepository = {
  createWithOwner(input: {
    name: string;
    description: string | null;
    ownerId: number;
  }): Organization {
    return db.transaction(() => {
      const result = insertOrganizationStmt.run(input);
      const organizationId = result.lastInsertRowid as number;
      addOwnerMembershipStmt.run(organizationId, input.ownerId);
      return findByIdStmt.get(organizationId) as Organization;
    })();
  },

  findById(id: number): Organization | undefined {
    return findByIdStmt.get(id) as Organization | undefined;
  },

  listForUser(userId: number): Organization[] {
    return listForUserStmt.all(userId) as Organization[];
  },

  update(
    id: number,
    input: { name: string; description: string | null; logoUrl: string | null }
  ): Organization {
    updateStmt.run({ id, ...input });
    return findByIdStmt.get(id) as Organization;
  },

  updateOwner(id: number, ownerId: number): void {
    updateOwnerStmt.run(ownerId, id);
  },

  remove(id: number): void {
    deleteStmt.run(id);
  }
};
