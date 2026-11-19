import { db } from '../db/index.js';
import type { Label, LabelRef } from '../models/label.model.js';

const insertStmt = db.prepare(
  'INSERT INTO labels (project_id, name, color) VALUES (?, ?, ?)'
);
const findByIdStmt = db.prepare('SELECT * FROM labels WHERE id = ?');
const listByProjectStmt = db.prepare(
  'SELECT * FROM labels WHERE project_id = ? ORDER BY name ASC'
);
const updateStmt = db.prepare(
  'UPDATE labels SET name = ?, color = ? WHERE id = ?'
);
const deleteStmt = db.prepare('DELETE FROM labels WHERE id = ?');

export const labelsRepository = {
  create(projectId: number, name: string, color: string): Label {
    const result = insertStmt.run(projectId, name, color);
    return findByIdStmt.get(result.lastInsertRowid) as Label;
  },

  findById(id: number): Label | undefined {
    return findByIdStmt.get(id) as Label | undefined;
  },

  listByProject(projectId: number): Label[] {
    return listByProjectStmt.all(projectId) as Label[];
  },

  update(id: number, name: string, color: string): Label {
    updateStmt.run(name, color, id);
    return findByIdStmt.get(id) as Label;
  },

  remove(id: number): void {
    deleteStmt.run(id);
  },

  // Batch-fetches labels for many tasks at once (used when building task list/detail
  // responses), rather than one query per task.
  listForTasks(taskIds: number[]): (LabelRef & { task_id: number })[] {
    if (taskIds.length === 0) return [];
    const placeholders = taskIds.map(() => '?').join(',');
    return db
      .prepare(
        `SELECT tl.task_id, l.id, l.name, l.color
         FROM task_labels tl
         JOIN labels l ON l.id = tl.label_id
         WHERE tl.task_id IN (${placeholders})`
      )
      .all(...taskIds) as (LabelRef & { task_id: number })[];
  }
};
