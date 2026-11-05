import '../../tasks/components/task-detail.css';
import { useCallback, useEffect, useState, type SubmitEvent } from 'react';
import { Alert } from '../../../components/alert.js';
import { Button } from '../../../components/button.js';
import { useSession } from '../../../lib/auth/session.js';
import { formatRelativeTime } from '../../../lib/utils/format.js';
import { commentsApi } from '../api.js';
import type { Comment } from '../types.js';

type CommentThreadProps = {
  taskId: number;
};

export function CommentThread({ taskId }: CommentThreadProps) {
  const session = useSession();
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editDraft, setEditDraft] = useState('');

  const load = useCallback(() => {
    commentsApi
      .listForTask(taskId)
      .then(result => setComments(result.data))
      .catch(err =>
        setError(
          err instanceof Error ? err.message : 'Failed to load comments.'
        )
      );
  }, [taskId]);

  useEffect(load, [load]);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const body = draft.trim();
    if (!body || submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      const created = await commentsApi.create(taskId, body);
      setComments(prev => [...(prev ?? []), created]);
      setDraft('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to post comment.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSaveEdit(commentId: number) {
    const body = editDraft.trim();
    if (!body) return;

    setError(null);
    try {
      const updated = await commentsApi.update(commentId, body);
      setComments(prev =>
        prev!.map(comment => (comment.id === commentId ? updated : comment))
      );
      setEditingId(null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to update comment.'
      );
    }
  }

  async function handleDelete(commentId: number) {
    setError(null);
    const previous = comments;
    setComments(prev => prev!.filter(comment => comment.id !== commentId));

    try {
      await commentsApi.remove(commentId);
    } catch (err) {
      setComments(previous);
      setError(
        err instanceof Error ? err.message : 'Failed to delete comment.'
      );
    }
  }

  const currentUserId =
    session.status === 'authenticated' ? session.user.id : null;

  return (
    <div>
      <h2>Comments</h2>

      <Alert variant='error'>{error}</Alert>

      {!comments ? (
        <p className='loading-state' role='status'>
          Loading…
        </p>
      ) : comments.length === 0 ? (
        <p className='empty-state'>No comments yet.</p>
      ) : (
        <ul className='comment-list'>
          {comments.map(comment => (
            <li key={comment.id} className='comment-item'>
              <div className='comment-header'>
                <span className='comment-author'>{comment.author_name}</span>
                <span className='list-item-meta'>
                  {formatRelativeTime(comment.created_at)}
                </span>
              </div>

              {editingId === comment.id ? (
                <div className='form'>
                  <label
                    className='sr-only'
                    htmlFor={`edit-comment-${comment.id}`}
                  >
                    Edit comment
                  </label>
                  <textarea
                    id={`edit-comment-${comment.id}`}
                    className='form-input'
                    value={editDraft}
                    onChange={event => setEditDraft(event.target.value)}
                    rows={3}
                  />
                  <div className='form-actions'>
                    <Button
                      variant='primary'
                      onClick={() => handleSaveEdit(comment.id)}
                    >
                      Save
                    </Button>
                    <Button
                      variant='secondary'
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <p className='comment-body'>{comment.body}</p>
                  {comment.author_id === currentUserId && (
                    <div className='comment-actions'>
                      <Button
                        variant='link'
                        onClick={() => {
                          setEditingId(comment.id);
                          setEditDraft(comment.body);
                        }}
                        aria-label={`Edit comment from ${formatRelativeTime(
                          comment.created_at
                        )}`}
                      >
                        Edit
                      </Button>
                      <Button
                        variant='link'
                        onClick={() => handleDelete(comment.id)}
                        aria-label={`Delete comment from ${formatRelativeTime(
                          comment.created_at
                        )}`}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      <form className='form' onSubmit={handleSubmit} noValidate>
        <label className='sr-only' htmlFor='new-comment'>
          Write a comment
        </label>
        <textarea
          id='new-comment'
          className='form-input'
          placeholder='Write a comment… use @username to mention someone'
          value={draft}
          onChange={event => setDraft(event.target.value)}
          disabled={submitting}
          rows={3}
        />
        <div className='form-actions'>
          <Button type='submit' variant='primary' disabled={submitting}>
            {submitting ? 'Posting…' : 'Post comment'}
          </Button>
        </div>
      </form>
    </div>
  );
}
