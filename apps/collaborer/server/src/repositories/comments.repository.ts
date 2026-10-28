import { db } from '../db/index.js';
import type { Comment, CommentWithAuthor } from '../models/comment.model.js';

const insertStmt = db.prepare(
  'INSERT INTO comments (task_id, author_id, body) VALUES (?, ?, ?)'
);
const findByIdStmt = db.prepare('SELECT * FROM comments WHERE id = ?');

const listByTaskStmt = db.prepare(`
  SELECT c.*, u.name AS author_name, u.avatar_url AS author_avatar_url
  FROM comments c
  JOIN users u ON u.id = c.author_id
  WHERE c.task_id = ?
  ORDER BY c.created_at ASC
  LIMIT ? OFFSET ?
`);

const countByTaskStmt = db.prepare(
  'SELECT COUNT(*) AS count FROM comments WHERE task_id = ?'
);

const updateStmt = db.prepare(
  "UPDATE comments SET body = ?, updated_at = strftime('%Y-%m-%dT%H:%M:%fZ', 'now') WHERE id = ?"
);

const deleteStmt = db.prepare('DELETE FROM comments WHERE id = ?');

export const commentsRepository = {
  create(taskId: number, authorId: number, body: string): Comment {
    const result = insertStmt.run(taskId, authorId, body);
    return findByIdStmt.get(result.lastInsertRowid) as Comment;
  },

  findById(id: number): Comment | undefined {
    return findByIdStmt.get(id) as Comment | undefined;
  },

  listByTask(
    taskId: number,
    limit: number,
    offset: number
  ): CommentWithAuthor[] {
    return listByTaskStmt.all(taskId, limit, offset) as CommentWithAuthor[];
  },

  countByTask(taskId: number): number {
    return (countByTaskStmt.get(taskId) as { count: number }).count;
  },

  update(id: number, body: string): Comment {
    updateStmt.run(body, id);
    return findByIdStmt.get(id) as Comment;
  },

  remove(id: number): void {
    deleteStmt.run(id);
  }
};
