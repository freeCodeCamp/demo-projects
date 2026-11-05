import type { Request, Response } from 'express';
import { attachmentsService } from '../services/attachments.service.js';
import { BadRequestError } from '../utils/errors.js';

export const attachmentsController = {
  async upload(req: Request, res: Response): Promise<void> {
    if (!req.file) {
      throw new BadRequestError('FILE_REQUIRED', 'A file is required.');
    }

    const attachment = await attachmentsService.upload(
      req.taskId!,
      req.projectId!,
      req.organizationId!,
      req.user!.id,
      {
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        buffer: req.file.buffer
      }
    );

    res.status(201).json({ data: attachment });
  },

  list(req: Request, res: Response): void {
    res.json({ data: attachmentsService.listForTask(req.taskId!) });
  },

  async download(req: Request, res: Response): Promise<void> {
    const { attachment, data } = await attachmentsService.download(
      req.attachmentId!
    );
    res.setHeader('Content-Type', attachment.mime_type);
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${attachment.filename}"`
    );
    res.send(data);
  },

  async remove(req: Request, res: Response): Promise<void> {
    await attachmentsService.remove(req.attachmentId!, req.user!.id);
    res.status(204).send();
  }
};
