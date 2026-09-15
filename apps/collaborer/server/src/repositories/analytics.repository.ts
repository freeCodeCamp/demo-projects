import { db } from '../db/index.js';
import type { TaskPriority, TaskStatus } from '../models/task.model.js';

interface StatusCountRow {
  status: TaskStatus;
  count: number;
}

interface PriorityCountRow {
  priority: TaskPriority;
  count: number;
}

interface TimestampRow {
  created_at: string;
}

// SUM(CASE ...) over zero rows returns NULL, not 0 — callers normalize this.
interface SplitCountRow {
  matched: number | null;
  total: number;
}

// Every metric below needs the same "org manager sees every project / plain
// member only their explicit projects" visibility split already established
// by search.repository.ts. Preparing both variants once here (rather than
// hand-writing the prepare+pick boilerplate six times) keeps each metric's
// SQL as one explicit, readable string.
function visibilityPair<Row>(managerSql: string, memberSql: string) {
  const managerStmt = db.prepare(managerSql);
  const memberStmt = db.prepare(memberSql);
  return (params: Record<string, unknown>, isOrgManager: boolean): Row[] =>
    (isOrgManager ? managerStmt : memberStmt).all(params) as Row[];
}

const taskStatusCountsQuery = visibilityPair<StatusCountRow>(
  `SELECT t.status, COUNT(*) AS count FROM tasks t
   JOIN projects p ON p.id = t.project_id
   WHERE p.organization_id = @organizationId
   GROUP BY t.status`,
  `SELECT t.status, COUNT(*) AS count FROM tasks t
   JOIN projects p ON p.id = t.project_id
   JOIN project_members pm ON pm.project_id = p.id AND pm.user_id = @userId
   WHERE p.organization_id = @organizationId
   GROUP BY t.status`
);

const taskPriorityCountsQuery = visibilityPair<PriorityCountRow>(
  `SELECT t.priority, COUNT(*) AS count FROM tasks t
   JOIN projects p ON p.id = t.project_id
   WHERE p.organization_id = @organizationId
   GROUP BY t.priority`,
  `SELECT t.priority, COUNT(*) AS count FROM tasks t
   JOIN projects p ON p.id = t.project_id
   JOIN project_members pm ON pm.project_id = p.id AND pm.user_id = @userId
   WHERE p.organization_id = @organizationId
   GROUP BY t.priority`
);

const completionTimestampsQuery = visibilityPair<TimestampRow>(
  `SELECT a.created_at FROM activities a
   JOIN projects p ON p.id = a.project_id
   WHERE p.organization_id = @organizationId
     AND a.action = 'task.status_changed'
     AND json_extract(a.metadata, '$.to') = 'done'
     AND a.created_at >= @since`,
  `SELECT a.created_at FROM activities a
   JOIN projects p ON p.id = a.project_id
   JOIN project_members pm ON pm.project_id = p.id AND pm.user_id = @userId
   WHERE p.organization_id = @organizationId
     AND a.action = 'task.status_changed'
     AND json_extract(a.metadata, '$.to') = 'done'
     AND a.created_at >= @since`
);

const activityTimestampsQuery = visibilityPair<TimestampRow>(
  `SELECT a.created_at FROM activities a
   JOIN projects p ON p.id = a.project_id
   WHERE p.organization_id = @organizationId
     AND a.created_at >= @since`,
  `SELECT a.created_at FROM activities a
   JOIN projects p ON p.id = a.project_id
   JOIN project_members pm ON pm.project_id = p.id AND pm.user_id = @userId
   WHERE p.organization_id = @organizationId
     AND a.created_at >= @since`
);

const overdueSplitQuery = visibilityPair<SplitCountRow>(
  `SELECT
     SUM(CASE WHEN t.due_date IS NOT NULL AND t.due_date < @now AND t.status != 'done' THEN 1 ELSE 0 END) AS matched,
     COUNT(*) AS total
   FROM tasks t
   JOIN projects p ON p.id = t.project_id
   WHERE p.organization_id = @organizationId`,
  `SELECT
     SUM(CASE WHEN t.due_date IS NOT NULL AND t.due_date < @now AND t.status != 'done' THEN 1 ELSE 0 END) AS matched,
     COUNT(*) AS total
   FROM tasks t
   JOIN projects p ON p.id = t.project_id
   JOIN project_members pm ON pm.project_id = p.id AND pm.user_id = @userId
   WHERE p.organization_id = @organizationId`
);

const subtaskCompletionSplitQuery = visibilityPair<SplitCountRow>(
  `SELECT
     SUM(CASE WHEN s.is_completed = 1 THEN 1 ELSE 0 END) AS matched,
     COUNT(*) AS total
   FROM subtasks s
   JOIN tasks t ON t.id = s.task_id
   JOIN projects p ON p.id = t.project_id
   WHERE p.organization_id = @organizationId`,
  `SELECT
     SUM(CASE WHEN s.is_completed = 1 THEN 1 ELSE 0 END) AS matched,
     COUNT(*) AS total
   FROM subtasks s
   JOIN tasks t ON t.id = s.task_id
   JOIN projects p ON p.id = t.project_id
   JOIN project_members pm ON pm.project_id = p.id AND pm.user_id = @userId
   WHERE p.organization_id = @organizationId`
);

export const analyticsRepository = {
  taskStatusCounts(
    organizationId: number,
    userId: number,
    isOrgManager: boolean
  ): StatusCountRow[] {
    return taskStatusCountsQuery({ organizationId, userId }, isOrgManager);
  },

  taskPriorityCounts(
    organizationId: number,
    userId: number,
    isOrgManager: boolean
  ): PriorityCountRow[] {
    return taskPriorityCountsQuery({ organizationId, userId }, isOrgManager);
  },

  completionTimestamps(
    organizationId: number,
    userId: number,
    since: string,
    isOrgManager: boolean
  ): string[] {
    return completionTimestampsQuery(
      { organizationId, userId, since },
      isOrgManager
    ).map(row => row.created_at);
  },

  activityTimestamps(
    organizationId: number,
    userId: number,
    since: string,
    isOrgManager: boolean
  ): string[] {
    return activityTimestampsQuery(
      { organizationId, userId, since },
      isOrgManager
    ).map(row => row.created_at);
  },

  overdueSplit(
    organizationId: number,
    userId: number,
    now: string,
    isOrgManager: boolean
  ): SplitCountRow {
    return overdueSplitQuery({ organizationId, userId, now }, isOrgManager)[0]!;
  },

  subtaskCompletionSplit(
    organizationId: number,
    userId: number,
    isOrgManager: boolean
  ): SplitCountRow {
    return subtaskCompletionSplitQuery(
      { organizationId, userId },
      isOrgManager
    )[0]!;
  }
};
