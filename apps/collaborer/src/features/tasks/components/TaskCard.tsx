import './kanban.css';
import { useDraggable } from '@dnd-kit/core';
import {
  formatDate,
  formatEnumLabel,
  isOverdue
} from '../../../lib/utils/format.js';
import type { TaskListItem } from '../types.js';

type TaskCardProps = {
  task: TaskListItem;
};

function TaskCardBody({ task }: TaskCardProps) {
  return (
    <>
      <div className='task-card-title'>{task.title}</div>

      <div className='task-card-meta'>
        <span className={`badge badge-priority-${task.priority}`}>
          {formatEnumLabel(task.priority)}
        </span>
        {task.due_date && (
          <span
            className={`badge ${
              isOverdue(task.due_date) ? 'badge-danger' : 'badge-neutral'
            }`}
          >
            {formatDate(task.due_date)}
          </span>
        )}
      </div>

      {task.labels.length > 0 && (
        <div className='task-card-labels'>
          {task.labels.map(label => (
            <span
              key={label.id}
              className='task-label'
              style={{ backgroundColor: label.color }}
            >
              {label.name}
            </span>
          ))}
        </div>
      )}

      <div className='task-card-footer'>
        <span>
          {task.subtask_total > 0
            ? `${task.subtask_completed}/${task.subtask_total} subtasks`
            : ''}
        </span>
        {task.assignee_name && <span>{task.assignee_name}</span>}
      </div>
    </>
  );
}

// A plain <a> as the draggable root works because KanbanBoard configures its
// PointerSensor with an activation distance — without one, dnd-kit treats
// every pointerdown as a drag start with zero movement, which swallows plain
// clicks before they can navigate.
//
// The original card doesn't follow the pointer itself (no translate transform
// applied here) — it just dims via `task-card-dragging`. KanbanBoard renders
// the pointer-following copy in a dnd-kit <DragOverlay>, which portals to
// document.body so it isn't clipped by the column's `overflow-y: auto`.
export function TaskCard({ task }: TaskCardProps) {
  const { listeners, setNodeRef, isDragging } = useDraggable({ id: task.id });
  // Drop the keyboard activator: dnd-kit binds Enter to start a drag, which
  // would hijack the native link-follow keystroke. Pointer drag still works;
  // keyboard users move tasks via the status <select> on TaskDetailPage.
  const { onKeyDown: _onKeyDown, ...dragListeners } = listeners ?? {};

  return (
    <a
      href={`/tasks/${task.id}`}
      ref={setNodeRef}
      {...dragListeners}
      className={`task-card${isDragging ? ' task-card-dragging' : ''}`}
    >
      <TaskCardBody task={task} />
    </a>
  );
}

// The floating copy dnd-kit renders inside <DragOverlay> while a drag is in
// progress. Deliberately not draggable/interactive itself (no useDraggable,
// not a real link) — it's a visual-only clone of whichever card is active.
export function TaskCardOverlay({ task }: TaskCardProps) {
  return (
    <div className='task-card task-card-overlay' aria-hidden='true'>
      <TaskCardBody task={task} />
    </div>
  );
}
