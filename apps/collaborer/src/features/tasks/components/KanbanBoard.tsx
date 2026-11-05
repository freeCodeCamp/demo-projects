import './kanban.css';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent
} from '@dnd-kit/core';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from '../../../components/alert.js';
import { useSession } from '../../../lib/auth/session.js';
import { ProjectSocket } from '../../../lib/websocket/client.js';
import { tasksApi } from '../api.js';
import type { Task, TaskListItem, TaskStatus } from '../types.js';
import { KanbanColumn } from './KanbanColumn.js';
import { TaskCardOverlay } from './TaskCard.js';

const COLUMNS: { status: TaskStatus; label: string }[] = [
  { status: 'backlog', label: 'Backlog' },
  { status: 'todo', label: 'Todo' },
  { status: 'in_progress', label: 'In Progress' },
  { status: 'in_review', label: 'In Review' },
  { status: 'done', label: 'Done' }
];

type KanbanBoardProps = {
  projectId: number;
};

export function KanbanBoard({ projectId }: KanbanBoardProps) {
  const session = useSession();
  const [tasks, setTasks] = useState<TaskListItem[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [activeTaskId, setActiveTaskId] = useState<number | null>(null);
  // A task card is also a link to its detail page. Without this, dnd-kit's
  // PointerSensor activates a drag on pointerdown with zero movement, which
  // swallows plain clicks — this makes it wait for real movement first, so a
  // click-with-no-drag reaches the <a> untouched and navigates normally.
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } })
  );

  const load = useCallback(() => {
    setLoadError(null);
    tasksApi
      .listForProject(projectId)
      .then(setTasks)
      .catch(err =>
        setLoadError(
          err instanceof Error ? err.message : 'Failed to load tasks.'
        )
      );
  }, [projectId]);

  useEffect(load, [load]);

  // Live sync: another user moving a card broadcasts task.updated. On
  // reconnect, refetch rather than assume nothing was missed while
  // disconnected (there's no server-side event replay — see the client's docs).
  useEffect(() => {
    const socket = new ProjectSocket(projectId, {
      onEvent: event => {
        if (event.type !== 'task.updated') return;
        const updated = event.data as Task;
        setTasks(
          prev =>
            prev?.map(task =>
              task.id === updated.id ? { ...task, ...updated } : task
            ) ?? prev
        );
      },
      onReconnect: load
    });
    socket.connect();
    return () => socket.close();
  }, [projectId, load]);

  if (session.status === 'loading' || (!tasks && !loadError)) {
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
  if (!tasks) return <></>;

  function handleDragStart(event: DragStartEvent) {
    setActiveTaskId(Number(event.active.id));
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveTaskId(null);

    const taskId = Number(event.active.id);
    const newStatus = event.over?.id as TaskStatus | undefined;
    if (!newStatus) return;

    const task = tasks!.find(item => item.id === taskId);
    if (!task || task.status === newStatus) return;

    const previousStatus = task.status;
    setTasks(prev =>
      prev!.map(item =>
        item.id === taskId ? { ...item, status: newStatus } : item
      )
    );

    tasksApi.update(taskId, { status: newStatus }).catch(() => {
      setTasks(prev =>
        prev!.map(item =>
          item.id === taskId ? { ...item, status: previousStatus } : item
        )
      );
      setActionError('Failed to move task. Please try again.');
    });
  }

  async function handleQuickAdd(status: TaskStatus, title: string) {
    setActionError(null);
    try {
      const created = await tasksApi.create(projectId, { title, status });
      // A freshly quick-added task can't have an assignee, labels, or subtasks
      // yet, so the bare Task response is safe to pad into a full TaskListItem
      // without a refetch.
      const newItem: TaskListItem = {
        ...created,
        assignee_name: null,
        assignee_avatar_url: null,
        subtask_total: 0,
        subtask_completed: 0,
        labels: []
      };
      setTasks(prev => [...(prev ?? []), newItem]);
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : 'Failed to create task.'
      );
    }
  }

  const activeTask =
    activeTaskId !== null
      ? tasks.find(task => task.id === activeTaskId)
      : undefined;

  return (
    <div>
      <Alert variant='error'>{actionError}</Alert>

      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={() => setActiveTaskId(null)}
      >
        <div className='kanban-board'>
          {COLUMNS.map(column => (
            <KanbanColumn
              key={column.status}
              status={column.status}
              label={column.label}
              tasks={tasks.filter(task => task.status === column.status)}
              onQuickAdd={title => handleQuickAdd(column.status, title)}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? <TaskCardOverlay task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
