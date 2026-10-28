import { beforeEach, describe, expect, it } from 'vitest';
import { subtasksService } from './subtasks.service.js';
import {
  createOrganization,
  createProject,
  createTask,
  createUser
} from '../test-utils/factories.js';
import { resetTestDatabase } from '../test-utils/db.js';
import { subtasksRepository } from '../repositories/subtasks.repository.js';

beforeEach(() => {
  resetTestDatabase();
});

describe('subtasksService', () => {
  it('creates and lists subtasks for a task', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const task = createTask(project, owner);

    const subtask = subtasksService.create(task.id, 'Write tests');

    expect(subtask).toMatchObject({
      task_id: task.id,
      title: 'Write tests',
      is_completed: false
    });
    expect(subtasksService.listForTask(task.id)).toEqual([subtask]);
  });

  it('updates title and completion state', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const task = createTask(project, owner);
    const subtask = subtasksService.create(task.id, 'Write tests');

    const updated = subtasksService.update(task.id, subtask.id, {
      isCompleted: true
    });

    expect(updated).toMatchObject({ title: 'Write tests', is_completed: true });
  });

  it('throws SUBTASK_NOT_FOUND when the subtask belongs to a different task than the URL', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const taskA = createTask(project, owner);
    const taskB = createTask(project, owner);
    const subtaskOnA = subtasksService.create(taskA.id, 'belongs to A');

    expect(() =>
      subtasksService.update(taskB.id, subtaskOnA.id, { isCompleted: true })
    ).toThrow(expect.objectContaining({ code: 'SUBTASK_NOT_FOUND' }));
    expect(() => subtasksService.remove(taskB.id, subtaskOnA.id)).toThrow(
      expect.objectContaining({ code: 'SUBTASK_NOT_FOUND' })
    );
  });

  it('removes a subtask', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const task = createTask(project, owner);
    const subtask = subtasksService.create(task.id, 'Write tests');

    subtasksService.remove(task.id, subtask.id);

    expect(subtasksRepository.findById(subtask.id)).toBeUndefined();
  });
});
