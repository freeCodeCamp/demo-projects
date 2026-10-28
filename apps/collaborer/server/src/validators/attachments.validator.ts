import multer from 'multer';
import { BadRequestError } from '../utils/errors.js';

export const MAX_ATTACHMENT_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

// Per the Edge Case Decisions doc: images, PDF, common office formats, plain text.
const ALLOWED_ATTACHMENT_MIME_TYPES = new Set([
  'image/png',
  'image/jpeg',
  'image/gif',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/vnd.ms-powerpoint',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  'text/plain',
  'text/csv'
]);

// Buffers the file in memory (bounded by the size limit below) rather than
// writing to a temp path — the attachments service hands the buffer straight to
// the storage adapter. Enforced here, before the handler/storage ever sees the
// file, per "reject anything else with a validation error before storage."
export const attachmentUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_ATTACHMENT_SIZE_BYTES, files: 1 },
  fileFilter(_req, file, callback) {
    if (!ALLOWED_ATTACHMENT_MIME_TYPES.has(file.mimetype)) {
      callback(
        new BadRequestError(
          'UNSUPPORTED_FILE_TYPE',
          'This file type is not supported.'
        )
      );
      return;
    }
    callback(null, true);
  }
});
