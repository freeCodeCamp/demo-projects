import { db } from '../db/index.js';
import type {
  Attachment,
  AttachmentWithUploader
} from '../models/attachment.model.js';

const insertStmt = db.prepare(`
  INSERT INTO attachments (task_id, filename, storage_key, mime_type, size, uploaded_by)
  VALUES (@taskId, @filename, @storageKey, @mimeType, @size, @uploadedBy)
`);

const findByIdStmt = db.prepare('SELECT * FROM attachments WHERE id = ?');

const listByTaskStmt = db.prepare(`
  SELECT a.*, u.name AS uploader_name
  FROM attachments a
  JOIN users u ON u.id = a.uploaded_by
  WHERE a.task_id = ?
  ORDER BY a.created_at DESC
`);

const deleteStmt = db.prepare('DELETE FROM attachments WHERE id = ?');

export const attachmentsRepository = {
  create(input: {
    taskId: number;
    filename: string;
    storageKey: string;
    mimeType: string;
    size: number;
    uploadedBy: number;
  }): Attachment {
    const result = insertStmt.run(input);
    return findByIdStmt.get(result.lastInsertRowid) as Attachment;
  },

  findById(id: number): Attachment | undefined {
    return findByIdStmt.get(id) as Attachment | undefined;
  },

  listByTask(taskId: number): AttachmentWithUploader[] {
    return listByTaskStmt.all(taskId) as AttachmentWithUploader[];
  },

  remove(id: number): void {
    deleteStmt.run(id);
  }
};
