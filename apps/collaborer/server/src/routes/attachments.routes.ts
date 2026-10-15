import { Router } from 'express';
import { attachmentsController } from '../controllers/attachments.controller.js';
import { authenticate } from '../middleware/authenticate.js';
import { requireAttachmentAccess } from '../middleware/authorize.js';
import { attachmentUpload } from '../validators/attachments.validator.js';

// Mounted at /tasks/:taskId/attachments. requireTaskAccess has already run on the
// parent tasksRouter for the whole /:taskId/* prefix, so no separate check here.
export const taskAttachmentsRouter = Router({ mergeParams: true });
taskAttachmentsRouter.post(
  '/',
  attachmentUpload.single('file'),
  attachmentsController.upload
);
taskAttachmentsRouter.get('/', attachmentsController.list);

// Mounted at the top level, /attachments — individual attachment resources by ID.
export const attachmentsRouter = Router();
attachmentsRouter.use(authenticate);
attachmentsRouter.use('/:attachmentId', requireAttachmentAccess);
attachmentsRouter.get(
  '/:attachmentId/download',
  attachmentsController.download
);
attachmentsRouter.delete('/:attachmentId', attachmentsController.remove);
