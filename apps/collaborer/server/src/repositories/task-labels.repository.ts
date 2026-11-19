import { db } from '../db/index.js';

const existsStmt = db.prepare(
  'SELECT 1 FROM task_labels WHERE task_id = ? AND label_id = ?'
);
const attachStmt = db.prepare(
  'INSERT INTO task_labels (task_id, label_id) VALUES (?, ?)'
);
const detachStmt = db.prepare(
  'DELETE FROM task_labels WHERE task_id = ? AND label_id = ?'
);

export const taskLabelsRepository = {
  isAttached(taskId: number, labelId: number): boolean {
    return existsStmt.get(taskId, labelId) !== undefined;
  },

  attach(taskId: number, labelId: number): void {
    attachStmt.run(taskId, labelId);
  },

  detach(taskId: number, labelId: number): void {
    detachStmt.run(taskId, labelId);
  }
};
