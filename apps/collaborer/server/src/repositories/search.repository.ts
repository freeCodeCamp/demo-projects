import { db } from '../db/index.js';
import type { Project } from '../models/project.model.js';
import type { TaskWithAssignee } from '../models/task.model.js';

const SEARCH_RESULT_LIMIT = 20;

// Owners/admins search every project in the org; plain members only search
// projects they're an explicit member of — same visibility rule enforced by
// requireProjectViewAccess and projectsService.listForOrganization.
const searchProjectsAsManagerStmt = db.prepare(`
  SELECT * FROM projects
  WHERE organization_id = @organizationId
    AND (name LIKE @pattern ESCAPE '\\' OR description LIKE @pattern ESCAPE '\\')
  ORDER BY updated_at DESC
  LIMIT ${SEARCH_RESULT_LIMIT}
`);

const searchProjectsAsMemberStmt = db.prepare(`
  SELECT p.* FROM projects p
  JOIN project_members pm ON pm.project_id = p.id AND pm.user_id = @userId
  WHERE p.organization_id = @organizationId
    AND (p.name LIKE @pattern ESCAPE '\\' OR p.description LIKE @pattern ESCAPE '\\')
  ORDER BY p.updated_at DESC
  LIMIT ${SEARCH_RESULT_LIMIT}
`);

const TASK_SELECT = `
  t.*, u.name AS assignee_name, u.avatar_url AS assignee_avatar_url,
  (SELECT COUNT(*) FROM subtasks s WHERE s.task_id = t.id) AS subtask_total,
  (SELECT COUNT(*) FROM subtasks s WHERE s.task_id = t.id AND s.is_completed = 1) AS subtask_completed
`;

const searchTasksAsManagerStmt = db.prepare(`
  SELECT ${TASK_SELECT}
  FROM tasks t
  JOIN projects p ON p.id = t.project_id
  LEFT JOIN users u ON u.id = t.assignee_id
  WHERE p.organization_id = @organizationId
    AND (t.title LIKE @pattern ESCAPE '\\' OR t.description LIKE @pattern ESCAPE '\\')
  ORDER BY t.updated_at DESC
  LIMIT ${SEARCH_RESULT_LIMIT}
`);

const searchTasksAsMemberStmt = db.prepare(`
  SELECT ${TASK_SELECT}
  FROM tasks t
  JOIN projects p ON p.id = t.project_id
  JOIN project_members pm ON pm.project_id = p.id AND pm.user_id = @userId
  LEFT JOIN users u ON u.id = t.assignee_id
  WHERE p.organization_id = @organizationId
    AND (t.title LIKE @pattern ESCAPE '\\' OR t.description LIKE @pattern ESCAPE '\\')
  ORDER BY t.updated_at DESC
  LIMIT ${SEARCH_RESULT_LIMIT}
`);

// Escapes SQLite LIKE wildcards in user input so a literal "%" or "_" in a search
// query doesn't get treated as a wildcard.
function toLikePattern(query: string): string {
  const escaped = query.replace(/[\\%_]/g, char => `\\${char}`);
  return `%${escaped}%`;
}

export const searchRepository = {
  searchProjects(
    organizationId: number,
    userId: number,
    isOrgManager: boolean,
    query: string
  ): Project[] {
    const pattern = toLikePattern(query);
    if (isOrgManager) {
      return searchProjectsAsManagerStmt.all({
        organizationId,
        pattern
      }) as Project[];
    }
    return searchProjectsAsMemberStmt.all({
      organizationId,
      userId,
      pattern
    }) as Project[];
  },

  searchTasks(
    organizationId: number,
    userId: number,
    isOrgManager: boolean,
    query: string
  ): TaskWithAssignee[] {
    const pattern = toLikePattern(query);
    if (isOrgManager) {
      return searchTasksAsManagerStmt.all({
        organizationId,
        pattern
      }) as TaskWithAssignee[];
    }
    return searchTasksAsMemberStmt.all({
      organizationId,
      userId,
      pattern
    }) as TaskWithAssignee[];
  }
};
