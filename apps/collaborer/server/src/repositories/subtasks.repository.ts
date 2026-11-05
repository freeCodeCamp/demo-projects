import { db } from '../db/index.js';
import type { Subtask } from '../models/subtask.model.js';

interface SubtaskRow {
  id: number;
  task_id: number;
  title: string;
  is_completed: number;
  created_at: string;
  updated_at: string;
}

const insertStmt = db.prepare(
  'INSERT INTO subtasks (task_id, title) VALUES (?, ?)'
);
const findByIdStmt = db.prepare('SELECT * FROM subtasks WHERE id = ?');
const listByTaskStmt = db.prepare(
  'SELECT * FROM subtasks WHERE task_id = ? ORDER BY created_at ASC'
);
const updateStmt = db.prepare(
  "UPDATE subtasks SET title = ?, is_completed = ?, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now') WHERE id = ?"
);
const deleteStmt = db.prepare('DELETE FROM subtasks WHERE id = ?');

function toSubtask(row: SubtaskRow): Subtask {
  return { ...row, is_completed: Boolean(row.is_completed) };
}

export const subtasksRepository = {
  create(taskId: number, title: string): Subtask {
    const result = insertStmt.run(taskId, title);
    return toSubtask(findByIdStmt.get(result.lastInsertRowid) as SubtaskRow);
  },

  findById(id: number): Subtask | undefined {
    const row = findByIdStmt.get(id) as SubtaskRow | undefined;
    return row ? toSubtask(row) : undefined;
  },

  listByTask(taskId: number): Subtask[] {
    return (listByTaskStmt.all(taskId) as SubtaskRow[]).map(toSubtask);
  },

  update(id: number, title: string, isCompleted: boolean): Subtask {
    updateStmt.run(title, isCompleted ? 1 : 0, id);
    return toSubtask(findByIdStmt.get(id) as SubtaskRow);
  },

  remove(id: number): void {
    deleteStmt.run(id);
  }
};
