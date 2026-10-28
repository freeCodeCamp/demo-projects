import './kanban.css';
import { useDroppable } from '@dnd-kit/core';
import { useState, type SubmitEvent } from 'react';
import type { TaskListItem, TaskStatus } from '../types.js';
import { TaskCard } from './TaskCard.js';

type KanbanColumnProps = {
  status: TaskStatus;
  label: string;
  tasks: TaskListItem[];
  onQuickAdd: (title: string) => void;
};

export function KanbanColumn({
  status,
  label,
  tasks,
  onQuickAdd
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  const [draft, setDraft] = useState('');

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const title = draft.trim();
    if (!title) return;
    onQuickAdd(title);
    setDraft('');
  }

  return (
    <div
      ref={setNodeRef}
      className={`kanban-column${isOver ? ' kanban-column-over' : ''}`}
    >
      <div className='kanban-column-header'>
        <h2>{label}</h2>
        <span className='kanban-column-count'>{tasks.length}</span>
      </div>

      <div className='kanban-column-body'>
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      <form className='kanban-quick-add' onSubmit={handleSubmit}>
        <label className='sr-only' htmlFor={`quick-add-${status}`}>
          Add a task to {label}
        </label>
        <input
          id={`quick-add-${status}`}
          className='form-input'
          placeholder='+ Add task'
          value={draft}
          onChange={event => setDraft(event.target.value)}
        />
      </form>
    </div>
  );
}
