import { db } from '../db/index.js';
import type {
  Task,
  TaskAssignedToUser,
  TaskPriority,
  TaskStatus,
  TaskWithAssignee
} from '../models/task.model.js';

export interface TaskFilters {
  status?: TaskStatus;
  priority?: TaskPriority;
  assigneeId?: number;
  labelId?: number;
  dueBefore?: string;
  dueAfter?: string;
}

export type TaskSortField =
  | 'created_at'
  | 'updated_at'
  | 'due_date'
  | 'priority';
export type SortOrder = 'asc' | 'desc';

const PRIORITY_RANK_SQL =
  "CASE t.priority WHEN 'urgent' THEN 4 WHEN 'high' THEN 3 WHEN 'medium' THEN 2 ELSE 1 END";

const SORT_COLUMNS: Record<TaskSortField, string> = {
  created_at: 't.created_at',
  updated_at: 't.updated_at',
  due_date: 't.due_date',
  priority: PRIORITY_RANK_SQL
};

const TASK_WITH_ASSIGNEE_SELECT = `
  SELECT t.*, u.name AS assignee_name, u.avatar_url AS assignee_avatar_url,
    (SELECT COUNT(*) FROM subtasks s WHERE s.task_id = t.id) AS subtask_total,
    (SELECT COUNT(*) FROM subtasks s WHERE s.task_id = t.id AND s.is_completed = 1) AS subtask_completed
  FROM tasks t
  LEFT JOIN users u ON u.id = t.assignee_id
`;

const insertStmt = db.prepare(`
  INSERT INTO tasks (project_id, title, description, status, priority, assignee_id, creator_id, due_date)
  VALUES (@projectId, @title, @description, @status, @priority, @assigneeId, @creatorId, @dueDate)
`);

const findByIdStmt = db.prepare('SELECT * FROM tasks WHERE id = ?');
const findWithAssigneeStmt = db.prepare(
  `${TASK_WITH_ASSIGNEE_SELECT} WHERE t.id = ?`
);

const updateStmt = db.prepare(`
  UPDATE tasks
  SET title = @title, description = @description, status = @status, priority = @priority,
      assignee_id = @assigneeId, due_date = @dueDate, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now')
  WHERE id = @id
`);

const deleteStmt = db.prepare('DELETE FROM tasks WHERE id = ?');

// Safe without a per-row access check: a user can only ever become assignee_id
// on a task the assignment flow already verified they have project access to
// (see assertAssigneeHasProjectAccess in tasks.service.ts), so this can never
// surface a task from a project the caller can't see.
const findAssignedToUserStmt = db.prepare(`
  SELECT t.*, p.name AS project_name, p.organization_id,
    (SELECT COUNT(*) FROM subtasks s WHERE s.task_id = t.id) AS subtask_total,
    (SELECT COUNT(*) FROM subtasks s WHERE s.task_id = t.id AND s.is_completed = 1) AS subtask_completed
  FROM tasks t
  JOIN projects p ON p.id = t.project_id
  WHERE t.assignee_id = ?
  ORDER BY (t.due_date IS NULL) ASC, t.due_date ASC
  LIMIT 50
`);

function buildFilters(
  projectId: number,
  filters: TaskFilters
): { where: string; params: Record<string, unknown> } {
  const conditions = ['t.project_id = @projectId'];
  const params: Record<string, unknown> = { projectId };

  if (filters.status) {
    conditions.push('t.status = @status');
    params.status = filters.status;
  }
  if (filters.priority) {
    conditions.push('t.priority = @priority');
    params.priority = filters.priority;
  }
  if (filters.assigneeId !== undefined) {
    conditions.push('t.assignee_id = @assigneeId');
    params.assigneeId = filters.assigneeId;
  }
  if (filters.dueBefore) {
    conditions.push('t.due_date IS NOT NULL AND t.due_date <= @dueBefore');
    params.dueBefore = filters.dueBefore;
  }
  if (filters.dueAfter) {
    conditions.push('t.due_date IS NOT NULL AND t.due_date >= @dueAfter');
    params.dueAfter = filters.dueAfter;
  }
  if (filters.labelId !== undefined) {
    conditions.push(
      'EXISTS (SELECT 1 FROM task_labels tl WHERE tl.task_id = t.id AND tl.label_id = @labelId)'
    );
    params.labelId = filters.labelId;
  }

  return { where: conditions.join(' AND '), params };
}

export const tasksRepository = {
  create(input: {
    projectId: number;
    title: string;
    description: string | null;
    status: TaskStatus;
    priority: TaskPriority;
    assigneeId: number | null;
    creatorId: number;
    dueDate: string | null;
  }): Task {
    const result = insertStmt.run(input);
    return findByIdStmt.get(result.lastInsertRowid) as Task;
  },

  findById(id: number): Task | undefined {
    return findByIdStmt.get(id) as Task | undefined;
  },

  findByIdWithAssignee(id: number): TaskWithAssignee | undefined {
    return findWithAssigneeStmt.get(id) as TaskWithAssignee | undefined;
  },

  // sort.field/order are only ever populated from a validated zod enum upstream —
  // never raw user input — so interpolating them into the SQL string is safe here.
  list(
    projectId: number,
    filters: TaskFilters,
    sort: { field: TaskSortField; order: SortOrder },
    pagination: { limit: number; offset: number }
  ): { rows: TaskWithAssignee[]; total: number } {
    const { where, params } = buildFilters(projectId, filters);
    const column = SORT_COLUMNS[sort.field];
    const direction = sort.order === 'asc' ? 'ASC' : 'DESC';

    const rows = db
      .prepare(
        `${TASK_WITH_ASSIGNEE_SELECT}
         WHERE ${where}
         ORDER BY ${column} ${direction}, t.id ${direction}
         LIMIT @limit OFFSET @offset`
      )
      .all({
        ...params,
        limit: pagination.limit,
        offset: pagination.offset
      }) as TaskWithAssignee[];

    const total = (
      db
        .prepare(`SELECT COUNT(*) AS count FROM tasks t WHERE ${where}`)
        .get(params) as { count: number }
    ).count;

    return { rows, total };
  },

  update(
    id: number,
    input: {
      title: string;
      description: string | null;
      status: TaskStatus;
      priority: TaskPriority;
      assigneeId: number | null;
      dueDate: string | null;
    }
  ): Task {
    updateStmt.run({ id, ...input });
    return findByIdStmt.get(id) as Task;
  },

  remove(id: number): void {
    deleteStmt.run(id);
  },

  findAssignedToUser(userId: number): TaskAssignedToUser[] {
    return findAssignedToUserStmt.all(userId) as TaskAssignedToUser[];
  }
};
