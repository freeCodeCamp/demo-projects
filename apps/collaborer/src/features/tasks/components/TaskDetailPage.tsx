import './task-detail.css';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from '../../../components/alert.js';
import { Button } from '../../../components/button.js';
import { TextField } from '../../../components/text-field.js';
import { CommentThread } from '../../comments/components/CommentThread.js';
import { useSession } from '../../../lib/auth/session.js';
import { formatEnumLabel } from '../../../lib/utils/format.js';
import { projectsApi } from '../../projects/api.js';
import type { Label, Project, ProjectMember } from '../../projects/types.js';
import { tasksApi } from '../api.js';
import type { TaskListItem, TaskPriority, TaskStatus } from '../types.js';
import { AttachmentList } from './AttachmentList.js';
import { SubtaskList } from './SubtaskList.js';

const STATUS_OPTIONS: TaskStatus[] = [
  'backlog',
  'todo',
  'in_progress',
  'in_review',
  'done'
];
const PRIORITY_OPTIONS: TaskPriority[] = ['low', 'medium', 'high', 'urgent'];

type TaskDetailPageProps = {
  taskId: number;
};

export function TaskDetailPage({ taskId }: TaskDetailPageProps) {
  const session = useSession();

  const [task, setTask] = useState<TaskListItem | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [members, setMembers] = useState<ProjectMember[] | null>(null);
  const [labels, setLabels] = useState<Label[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [addLabelId, setAddLabelId] = useState('');

  const load = useCallback(() => {
    setLoadError(null);
    tasksApi
      .getById(taskId)
      .then(loaded => {
        setTask(loaded);
        setTitle(loaded.title);
        setDescription(loaded.description ?? '');
        return projectsApi.getById(loaded.project_id);
      })
      .then(loadedProject => {
        setProject(loadedProject);
        return Promise.all([
          projectsApi.listMembers(loadedProject.id),
          projectsApi.listLabels(loadedProject.id)
        ]);
      })
      .then(([memberList, labelList]) => {
        setMembers(memberList);
        setLabels(labelList);
      })
      .catch(err =>
        setLoadError(
          err instanceof Error ? err.message : 'Failed to load task.'
        )
      );
  }, [taskId]);

  useEffect(load, [load]);

  if (session.status === 'loading' || (!task && !loadError)) {
    return (
      <p className='loading-state' role='status'>
        Loading…
      </p>
    );
  }
  if (session.status === 'unauthenticated') {
    if (typeof window !== 'undefined') {
      window.location.href = `/login?redirect=${encodeURIComponent(
        window.location.pathname
      )}`;
    }
    return <></>;
  }
  if (loadError) {
    return (
      <p className='error-state' role='alert'>
        {loadError}
      </p>
    );
  }
  if (!task) return <></>;

  async function saveField(input: Parameters<typeof tasksApi.update>[1]) {
    setActionError(null);
    try {
      const updated = await tasksApi.update(taskId, input);
      setTask(prev => (prev ? { ...prev, ...updated } : prev));
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : 'Failed to save changes.'
      );
    }
  }

  async function handleTitleBlur() {
    if (title.trim() && title !== task!.title) {
      await saveField({ title: title.trim() });
    }
  }

  async function handleDescriptionBlur() {
    if (description !== (task!.description ?? '')) {
      await saveField({ description });
    }
  }

  async function handleAddLabel() {
    if (!addLabelId) return;
    setActionError(null);
    try {
      await tasksApi.attachLabel(taskId, Number(addLabelId));
      setAddLabelId('');
      load();
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : 'Failed to add label.'
      );
    }
  }

  async function handleRemoveLabel(labelId: number) {
    setActionError(null);
    try {
      await tasksApi.detachLabel(taskId, labelId);
      load();
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : 'Failed to remove label.'
      );
    }
  }

  const availableLabels = (labels ?? []).filter(
    label => !task.labels.some(attached => attached.id === label.id)
  );

  return (
    <div>
      <Alert variant='error'>{actionError}</Alert>

      {project && (
        <p>
          <a href={`/projects/${project.id}`}>← {project.name}</a>
        </p>
      )}

      <TextField
        label='Title'
        value={title}
        onChange={event => setTitle(event.target.value)}
        onBlur={handleTitleBlur}
      />

      <div className='form-field'>
        <label className='form-label' htmlFor='task-description'>
          Description
        </label>
        <textarea
          id='task-description'
          className='form-input'
          rows={4}
          value={description}
          onChange={event => setDescription(event.target.value)}
          onBlur={handleDescriptionBlur}
        />
      </div>

      <div className='task-detail-meta'>
        <div className='form-field'>
          <label className='form-label' htmlFor='task-status'>
            Status
          </label>
          <select
            id='task-status'
            className='form-input'
            value={task.status}
            onChange={event =>
              saveField({ status: event.target.value as TaskStatus })
            }
          >
            {STATUS_OPTIONS.map(status => (
              <option key={status} value={status}>
                {formatEnumLabel(status)}
              </option>
            ))}
          </select>
        </div>

        <div className='form-field'>
          <label className='form-label' htmlFor='task-priority'>
            Priority
          </label>
          <select
            id='task-priority'
            className='form-input'
            value={task.priority}
            onChange={event =>
              saveField({ priority: event.target.value as TaskPriority })
            }
          >
            {PRIORITY_OPTIONS.map(priority => (
              <option key={priority} value={priority}>
                {formatEnumLabel(priority)}
              </option>
            ))}
          </select>
        </div>

        <div className='form-field'>
          <label className='form-label' htmlFor='task-assignee'>
            Assignee
          </label>
          <select
            id='task-assignee'
            className='form-input'
            value={task.assignee_id ?? ''}
            onChange={event =>
              saveField({
                assigneeId: event.target.value
                  ? Number(event.target.value)
                  : null
              })
            }
          >
            <option value=''>Unassigned</option>
            {(members ?? []).map(member => (
              <option key={member.user_id} value={member.user_id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        <div className='form-field'>
          <label className='form-label' htmlFor='task-due-date'>
            Due date
          </label>
          <input
            id='task-due-date'
            className='form-input'
            type='date'
            value={task.due_date ? task.due_date.slice(0, 10) : ''}
            onChange={event =>
              saveField({ dueDate: event.target.value || null })
            }
          />
        </div>
      </div>

      <div className='task-detail-labels'>
        {task.labels.map(label => (
          <span
            key={label.id}
            className='task-label'
            style={{ backgroundColor: label.color }}
          >
            {label.name}{' '}
            <Button variant='link' onClick={() => handleRemoveLabel(label.id)}>
              <span aria-hidden='true'>×</span>
              <span className='sr-only'>Remove {label.name}</span>
            </Button>
          </span>
        ))}

        {availableLabels.length > 0 && (
          <>
            <label className='sr-only' htmlFor='add-label-select'>
              Add a label
            </label>
            <select
              id='add-label-select'
              className='form-input'
              value={addLabelId}
              onChange={event => setAddLabelId(event.target.value)}
            >
              <option value=''>Add a label…</option>
              {availableLabels.map(label => (
                <option key={label.id} value={label.id}>
                  {label.name}
                </option>
              ))}
            </select>
            <Button
              variant='secondary'
              onClick={handleAddLabel}
              disabled={!addLabelId}
            >
              Add
            </Button>
          </>
        )}
      </div>

      <div className='page-section'>
        <SubtaskList taskId={taskId} />
      </div>

      <div className='page-section'>
        <AttachmentList taskId={taskId} />
      </div>

      <div className='page-section'>
        <CommentThread taskId={taskId} />
      </div>
    </div>
  );
}
