import './task-detail.css';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent
} from 'react';
import { Alert } from '../../../components/alert.js';
import { Button } from '../../../components/button.js';
import { apiUrl, ApiError } from '../../../lib/api/client.js';
import { useSession } from '../../../lib/auth/session.js';
import { formatFileSize } from '../../../lib/utils/format.js';
import { tasksApi } from '../api.js';
import type { Attachment } from '../types.js';

type AttachmentListProps = {
  taskId: number;
};

export function AttachmentList({ taskId }: AttachmentListProps) {
  const session = useSession();
  const [attachments, setAttachments] = useState<Attachment[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(() => {
    tasksApi
      .listAttachments(taskId)
      .then(setAttachments)
      .catch(err =>
        setError(
          err instanceof Error ? err.message : 'Failed to load attachments.'
        )
      );
  }, [taskId]);

  useEffect(load, [load]);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const attachment = await tasksApi.uploadAttachment(taskId, file);
      setAttachments(prev => [attachment, ...(prev ?? [])]);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'Failed to upload file.'
      );
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }

  async function handleRemove(attachmentId: number) {
    setError(null);
    const previous = attachments;
    setAttachments(prev =>
      prev!.filter(attachment => attachment.id !== attachmentId)
    );

    try {
      await tasksApi.removeAttachment(attachmentId);
    } catch (err) {
      setAttachments(previous);
      setError(
        err instanceof ApiError ? err.message : 'Failed to delete attachment.'
      );
    }
  }

  const currentUserId =
    session.status === 'authenticated' ? session.user.id : null;

  return (
    <div>
      <h2>Attachments</h2>

      <Alert variant='error'>{error}</Alert>

      {!attachments ? (
        <p className='loading-state' role='status'>
          Loading…
        </p>
      ) : attachments.length === 0 ? (
        <p className='empty-state'>No attachments yet.</p>
      ) : (
        <ul className='attachment-list'>
          {attachments.map(attachment => (
            <li key={attachment.id} className='attachment-item'>
              <a
                href={apiUrl(`/attachments/${attachment.id}/download`)}
                target='_blank'
                rel='noreferrer'
              >
                {attachment.filename}
              </a>
              <span className='list-item-meta'>
                {formatFileSize(attachment.size)} · {attachment.uploader_name}
              </span>
              {attachment.uploaded_by === currentUserId && (
                <Button
                  variant='link'
                  onClick={() => handleRemove(attachment.id)}
                  aria-label={`Delete ${attachment.filename}`}
                >
                  Delete
                </Button>
              )}
            </li>
          ))}
        </ul>
      )}

      <div className='form-field'>
        <label className='form-label' htmlFor='attachment-upload'>
          Upload a file
        </label>
        <input
          id='attachment-upload'
          ref={fileInputRef}
          type='file'
          onChange={handleFileChange}
          disabled={uploading}
        />
        <span className='loading-state' role='status'>
          {uploading ? 'Uploading…' : ''}
        </span>
      </div>
    </div>
  );
}
