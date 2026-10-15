import type {
  Attachment,
  AttachmentWithUploader
} from '../models/attachment.model.js';
import { attachmentsRepository } from '../repositories/attachments.repository.js';
import { tasksRepository } from '../repositories/tasks.repository.js';
import { storage } from '../storage/index.js';
import { ForbiddenError, NotFoundError } from '../utils/errors.js';
import { activityService } from './activity.service.js';

// Strips characters that would be unsafe to echo back into a Content-Disposition
// header (or that simply don't belong in a filename) — sanitized once here at
// write time rather than on every subsequent read.
function sanitizeFilename(filename: string): string {
  return filename.replace(/[\r\n"]/g, '').slice(0, 255) || 'file';
}

export const attachmentsService = {
  async upload(
    taskId: number,
    projectId: number,
    organizationId: number,
    uploadedBy: number,
    file: {
      originalname: string;
      mimetype: string;
      size: number;
      buffer: Buffer;
    }
  ): Promise<Attachment> {
    const task = tasksRepository.findById(taskId);
    if (!task) throw new NotFoundError('TASK_NOT_FOUND', 'Task not found.');

    const filename = sanitizeFilename(file.originalname);
    const storageKey = storage.generateKey(taskId, filename);
    await storage.save(storageKey, file.buffer);

    const attachment = attachmentsRepository.create({
      taskId,
      filename,
      storageKey,
      mimeType: file.mimetype,
      size: file.size,
      uploadedBy
    });

    activityService.record({
      organizationId,
      projectId,
      actorId: uploadedBy,
      action: 'attachment.uploaded',
      entityType: 'attachment',
      entityId: attachment.id,
      metadata: { taskId, filename }
    });

    return attachment;
  },

  listForTask(taskId: number): AttachmentWithUploader[] {
    return attachmentsRepository.listByTask(taskId);
  },

  async download(
    attachmentId: number
  ): Promise<{ attachment: Attachment; data: Buffer }> {
    const attachment = attachmentsRepository.findById(attachmentId);
    if (!attachment)
      throw new NotFoundError('ATTACHMENT_NOT_FOUND', 'Attachment not found.');

    const data = await storage.read(attachment.storage_key);
    return { attachment, data };
  },

  async remove(attachmentId: number, requestingUserId: number): Promise<void> {
    const attachment = attachmentsRepository.findById(attachmentId);
    if (!attachment)
      throw new NotFoundError('ATTACHMENT_NOT_FOUND', 'Attachment not found.');
    if (attachment.uploaded_by !== requestingUserId) {
      throw new ForbiddenError('You can only delete attachments you uploaded.');
    }

    attachmentsRepository.remove(attachmentId);
    await storage.delete(attachment.storage_key);
  }
};
