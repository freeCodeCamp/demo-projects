import { db } from '../db/index.js';
import type { Project, ProjectStatus } from '../models/project.model.js';

const insertStmt = db.prepare(`
  INSERT INTO projects (organization_id, name, description, status, created_by)
  VALUES (@organizationId, @name, @description, @status, @createdBy)
`);

const findByIdStmt = db.prepare('SELECT * FROM projects WHERE id = ?');

const listByOrganizationStmt = db.prepare(
  'SELECT * FROM projects WHERE organization_id = ? ORDER BY created_at DESC'
);

const listForMemberStmt = db.prepare(`
  SELECT p.* FROM projects p
  JOIN project_members pm ON pm.project_id = p.id
  WHERE p.organization_id = ? AND pm.user_id = ?
  ORDER BY p.created_at DESC
`);

const updateStmt = db.prepare(`
  UPDATE projects
  SET name = @name, description = @description, status = @status, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
  WHERE id = @id
`);

const deleteStmt = db.prepare('DELETE FROM projects WHERE id = ?');

export const projectsRepository = {
  create(input: {
    organizationId: number;
    name: string;
    description: string | null;
    status: ProjectStatus;
    createdBy: number;
  }): Project {
    const result = insertStmt.run(input);
    return findByIdStmt.get(result.lastInsertRowid) as Project;
  },

  findById(id: number): Project | undefined {
    return findByIdStmt.get(id) as Project | undefined;
  },

  listByOrganization(organizationId: number): Project[] {
    return listByOrganizationStmt.all(organizationId) as Project[];
  },

  listForMember(organizationId: number, userId: number): Project[] {
    return listForMemberStmt.all(organizationId, userId) as Project[];
  },

  update(
    id: number,
    input: { name: string; description: string | null; status: ProjectStatus }
  ): Project {
    updateStmt.run({ id, ...input });
    return findByIdStmt.get(id) as Project;
  },

  remove(id: number): void {
    deleteStmt.run(id);
  }
};
