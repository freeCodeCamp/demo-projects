import './task-detail.css';
import { useCallback, useEffect, useState, type SubmitEvent } from 'react';
import { Alert } from '../../../components/alert.js';
import { Button } from '../../../components/button.js';
import { tasksApi } from '../api.js';
import type { Subtask } from '../types.js';

type SubtaskListProps = {
  taskId: number;
};

// Deliberately independent of the parent task's status — completing every
// subtask here never changes the task's own status (see the PRD's Edge Case
// Decisions doc). Progress is shown as information only.
export function SubtaskList({ taskId }: SubtaskListProps) {
  const [subtasks, setSubtasks] = useState<Subtask[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState('');

  const load = useCallback(() => {
    tasksApi
      .listSubtasks(taskId)
      .then(setSubtasks)
      .catch(err =>
        setError(
          err instanceof Error ? err.message : 'Failed to load subtasks.'
        )
      );
  }, [taskId]);

  useEffect(load, [load]);

  async function handleAdd(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = draft.trim();
    if (!title) return;

    setError(null);
    try {
      const created = await tasksApi.createSubtask(taskId, title);
      setSubtasks(prev => [...(prev ?? []), created]);
      setDraft('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add subtask.');
    }
  }

  async function handleToggle(subtask: Subtask) {
    setError(null);
    const nextCompleted = !subtask.is_completed;
    setSubtasks(prev =>
      prev!.map(s =>
        s.id === subtask.id ? { ...s, is_completed: nextCompleted } : s
      )
    );

    try {
      await tasksApi.updateSubtask(taskId, subtask.id, {
        isCompleted: nextCompleted
      });
    } catch (err) {
      setSubtasks(prev =>
        prev!.map(s =>
          s.id === subtask.id ? { ...s, is_completed: subtask.is_completed } : s
        )
      );
      setError(
        err instanceof Error ? err.message : 'Failed to update subtask.'
      );
    }
  }

  async function handleRemove(subtaskId: number) {
    setError(null);
    const previous = subtasks;
    setSubtasks(prev => prev!.filter(s => s.id !== subtaskId));

    try {
      await tasksApi.removeSubtask(taskId, subtaskId);
    } catch (err) {
      setSubtasks(previous);
      setError(
        err instanceof Error ? err.message : 'Failed to delete subtask.'
      );
    }
  }

  const completed = subtasks?.filter(s => s.is_completed).length ?? 0;

  return (
    <div>
      <h2>
        Subtasks
        {subtasks && subtasks.length > 0 && (
          <span className='subtask-progress'>
            {' '}
            — {completed} of {subtasks.length} completed
          </span>
        )}
      </h2>

      <Alert variant='error'>{error}</Alert>

      {!subtasks ? (
        <p className='loading-state' role='status'>
          Loading…
        </p>
      ) : subtasks.length === 0 ? (
        <p className='empty-state'>No subtasks yet.</p>
      ) : (
        <ul className='subtask-list'>
          {subtasks.map(subtask => (
            <li key={subtask.id} className='subtask-item'>
              <label>
                <input
                  type='checkbox'
                  checked={subtask.is_completed}
                  onChange={() => handleToggle(subtask)}
                />
                <span
                  className={
                    subtask.is_completed ? 'subtask-title-done' : undefined
                  }
                >
                  {subtask.title}
                </span>
              </label>
              <Button
                variant='link'
                onClick={() => handleRemove(subtask.id)}
                aria-label={`Remove subtask ${subtask.title}`}
              >
                Remove
              </Button>
            </li>
          ))}
        </ul>
      )}

      <form className='subtask-add-form' onSubmit={handleAdd}>
        <label className='sr-only' htmlFor='new-subtask'>
          Add a subtask
        </label>
        <input
          id='new-subtask'
          className='form-input'
          placeholder='Add a subtask…'
          value={draft}
          onChange={event => setDraft(event.target.value)}
        />
        <Button type='submit' variant='secondary'>
          Add
        </Button>
      </form>
    </div>
  );
}
