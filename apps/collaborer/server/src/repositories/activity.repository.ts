import { db } from '../db/index.js';
import type { Activity } from '../models/activity.model.js';

interface ActivityRow {
  id: number;
  organization_id: number;
  project_id: number | null;
  actor_id: number;
  action: string;
  entity_type: string;
  entity_id: number;
  metadata: string;
  created_at: string;
  actor_name: string;
}

const insertStmt = db.prepare(`
  INSERT INTO activities (organization_id, project_id, actor_id, action, entity_type, entity_id, metadata)
  VALUES (@organizationId, @projectId, @actorId, @action, @entityType, @entityId, @metadata)
`);

const listByProjectStmt = db.prepare(`
  SELECT activities.*, users.name AS actor_name
  FROM activities
  JOIN users ON users.id = activities.actor_id
  WHERE activities.project_id = ?
  ORDER BY activities.created_at DESC
  LIMIT ? OFFSET ?
`);

const countByProjectStmt = db.prepare(
  'SELECT COUNT(*) AS count FROM activities WHERE project_id = ?'
);

function toActivity(row: ActivityRow): Activity {
  return {
    ...row,
    metadata: JSON.parse(row.metadata) as Record<string, unknown>
  };
}

export const activityRepository = {
  create(input: {
    organizationId: number;
    projectId: number | null;
    actorId: number;
    action: string;
    entityType: string;
    entityId: number;
    metadata: Record<string, unknown>;
  }): void {
    insertStmt.run({
      organizationId: input.organizationId,
      projectId: input.projectId,
      actorId: input.actorId,
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId,
      metadata: JSON.stringify(input.metadata)
    });
  },

  listByProject(projectId: number, limit: number, offset: number): Activity[] {
    return (
      listByProjectStmt.all(projectId, limit, offset) as ActivityRow[]
    ).map(toActivity);
  },

  countByProject(projectId: number): number {
    return (countByProjectStmt.get(projectId) as { count: number }).count;
  }
};
