import { db } from '../db/index.js';
import type { ProjectMemberWithUser } from '../models/project-member.model.js';

const findMembershipStmt = db.prepare(
  'SELECT * FROM project_members WHERE project_id = ? AND user_id = ?'
);
const insertStmt = db.prepare(
  'INSERT INTO project_members (project_id, user_id) VALUES (?, ?)'
);
const removeStmt = db.prepare(
  'DELETE FROM project_members WHERE project_id = ? AND user_id = ?'
);

const listStmt = db.prepare(`
  SELECT pm.id, pm.project_id, pm.user_id, pm.created_at, u.name, u.email, u.avatar_url
  FROM project_members pm
  JOIN users u ON u.id = pm.user_id
  WHERE pm.project_id = ?
  ORDER BY pm.created_at ASC
`);

// Same edge-case cleanup as organization-member removal, scoped to a single project.
const unassignTasksStmt = db.prepare(`
  UPDATE tasks SET assignee_id = NULL, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
  WHERE project_id = ? AND assignee_id = ?
`);

export const projectMembersRepository = {
  isMember(projectId: number, userId: number): boolean {
    return findMembershipStmt.get(projectId, userId) !== undefined;
  },

  add(projectId: number, userId: number): void {
    insertStmt.run(projectId, userId);
  },

  remove(projectId: number, userId: number): void {
    db.transaction(() => {
      removeStmt.run(projectId, userId);
      unassignTasksStmt.run(projectId, userId);
    })();
  },

  list(projectId: number): ProjectMemberWithUser[] {
    return listStmt.all(projectId) as ProjectMemberWithUser[];
  }
};
