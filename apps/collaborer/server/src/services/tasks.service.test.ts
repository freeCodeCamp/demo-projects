import { beforeEach, describe, expect, it } from 'vitest';
import { tasksService } from './tasks.service.js';
import {
  addOrganizationMember,
  addProjectMember,
  createLabel,
  createOrganization,
  createProject,
  createTask,
  createUser
} from '../test-utils/factories.js';
import { resetTestDatabase } from '../test-utils/db.js';
import { activityRepository } from '../repositories/activity.repository.js';
import { notificationsRepository } from '../repositories/notifications.repository.js';
import { taskLabelsRepository } from '../repositories/task-labels.repository.js';

beforeEach(() => {
  resetTestDatabase();
});

describe('tasksService.create', () => {
  it('creates the task and records a task.created activity entry', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);

    const task = tasksService.create(project.id, org.id, owner.id, {
      title: 'Write docs'
    });

    expect(task).toMatchObject({
      title: 'Write docs',
      status: 'backlog',
      priority: 'medium'
    });
    const activity = activityRepository.listByProject(project.id, 20, 0);
    expect(activity).toContainEqual(
      expect.objectContaining({ action: 'task.created' })
    );
  });

  it('notifies the assignee when created with one, unless self-assigned', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const assignee = createUser();
    addOrganizationMember(org, assignee, 'member');
    addProjectMember(project, assignee);

    tasksService.create(project.id, org.id, owner.id, {
      title: 'Task A',
      assigneeId: assignee.id
    });
    expect(notificationsRepository.count(assignee.id)).toBe(1);

    tasksService.create(project.id, org.id, owner.id, {
      title: 'Task B',
      assigneeId: owner.id
    });
    expect(notificationsRepository.count(owner.id)).toBe(0);
  });

  it('rejects an assignee who has no access to the project', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const outsider = createUser();
    createOrganization(outsider);

    expect(() =>
      tasksService.create(project.id, org.id, owner.id, {
        title: 'Task A',
        assigneeId: outsider.id
      })
    ).toThrow(expect.objectContaining({ code: 'INVALID_ASSIGNEE' }));
  });

  it('rejects a plain org member with no explicit project membership as assignee', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const member = createUser();
    addOrganizationMember(org, member, 'member'); // not an explicit project member

    expect(() =>
      tasksService.create(project.id, org.id, owner.id, {
        title: 'Task A',
        assigneeId: member.id
      })
    ).toThrow(expect.objectContaining({ code: 'INVALID_ASSIGNEE' }));
  });
});

describe('tasksService.update', () => {
  it("records activity and notifies the assignee on a status change, but not for the actor's own change", () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const assignee = createUser();
    addOrganizationMember(org, assignee, 'member');
    addProjectMember(project, assignee);
    const task = createTask(project, owner, { assigneeId: assignee.id });

    tasksService.update(task.id, project.id, org.id, owner.id, {
      status: 'in_progress'
    });

    expect(notificationsRepository.count(assignee.id)).toBe(1);
    expect(activityRepository.listByProject(project.id, 20, 0)).toContainEqual(
      expect.objectContaining({ action: 'task.status_changed' })
    );

    // The assignee changing their own task's status shouldn't self-notify.
    tasksService.update(task.id, project.id, org.id, assignee.id, {
      status: 'done'
    });
    expect(notificationsRepository.count(assignee.id)).toBe(1); // unchanged
  });

  it('records activity for a priority change without notifying anyone', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const task = createTask(project, owner);

    tasksService.update(task.id, project.id, org.id, owner.id, {
      priority: 'urgent'
    });

    expect(activityRepository.listByProject(project.id, 20, 0)).toContainEqual(
      expect.objectContaining({ action: 'task.priority_changed' })
    );
  });

  it('notifies the newly-assigned user on a reassignment, not the previous assignee', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const oldAssignee = createUser();
    const newAssignee = createUser();
    for (const u of [oldAssignee, newAssignee]) {
      addOrganizationMember(org, u, 'member');
      addProjectMember(project, u);
    }
    const task = createTask(project, owner, { assigneeId: oldAssignee.id });

    tasksService.update(task.id, project.id, org.id, owner.id, {
      assigneeId: newAssignee.id
    });

    expect(notificationsRepository.count(newAssignee.id)).toBe(1);
    expect(notificationsRepository.count(oldAssignee.id)).toBe(0);
  });

  it('leaves fields not present in the input unchanged', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const task = createTask(project, owner, {
      title: 'Original title',
      priority: 'high'
    });

    const updated = tasksService.update(task.id, project.id, org.id, owner.id, {
      status: 'todo'
    });

    expect(updated.title).toBe('Original title');
    expect(updated.priority).toBe('high');
    expect(updated.status).toBe('todo');
  });
});

describe('tasksService.getById / list', () => {
  it('getById returns the task with assignee info and attached labels', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const task = createTask(project, owner, { assigneeId: owner.id });
    const label = createLabel(project);
    tasksService.attachLabel(task.id, project.id, label.id);

    const result = tasksService.getById(task.id);

    expect(result.assignee_name).toBe(owner.name);
    expect(result.labels).toEqual([
      { id: label.id, name: label.name, color: label.color }
    ]);
  });

  it('throws TASK_NOT_FOUND for a missing task', () => {
    expect(() => tasksService.getById(999999)).toThrow(
      expect.objectContaining({ code: 'TASK_NOT_FOUND' })
    );
  });

  it('list filters by status and paginates', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    createTask(project, owner, { status: 'todo' });
    createTask(project, owner, { status: 'done' });
    createTask(project, owner, { status: 'todo' });

    const result = tasksService.list(
      project.id,
      { status: 'todo' },
      { field: 'created_at', order: 'asc' },
      { page: 1, limit: 20, offset: 0 }
    );

    expect(result.data).toHaveLength(2);
    expect(result.pagination.total).toBe(2);
    expect(result.data.every(task => task.status === 'todo')).toBe(true);
  });
});

describe('tasksService.attachLabel / detachLabel', () => {
  it('attaches a label from the same project', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const task = createTask(project, owner);
    const label = createLabel(project);

    tasksService.attachLabel(task.id, project.id, label.id);

    expect(taskLabelsRepository.isAttached(task.id, label.id)).toBe(true);
  });

  it('rejects a label that belongs to a different project', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const otherProject = createProject(org, owner);
    const task = createTask(project, owner);
    const foreignLabel = createLabel(otherProject);

    expect(() =>
      tasksService.attachLabel(task.id, project.id, foreignLabel.id)
    ).toThrow(expect.objectContaining({ code: 'LABEL_NOT_FOUND' }));
  });

  it('rejects attaching the same label twice', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const task = createTask(project, owner);
    const label = createLabel(project);
    tasksService.attachLabel(task.id, project.id, label.id);

    expect(() =>
      tasksService.attachLabel(task.id, project.id, label.id)
    ).toThrow(expect.objectContaining({ code: 'LABEL_ALREADY_ATTACHED' }));
  });

  it("detaches an attached label and rejects detaching one that isn't attached", () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const task = createTask(project, owner);
    const label = createLabel(project);
    tasksService.attachLabel(task.id, project.id, label.id);

    tasksService.detachLabel(task.id, label.id);

    expect(taskLabelsRepository.isAttached(task.id, label.id)).toBe(false);
    expect(() => tasksService.detachLabel(task.id, label.id)).toThrow(
      expect.objectContaining({ code: 'LABEL_NOT_ATTACHED' })
    );
  });
});

describe('tasksService.listAssignedToUser', () => {
  it('returns only tasks assigned to that user, across projects', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const assignee = createUser();
    addOrganizationMember(org, assignee, 'member');
    addProjectMember(project, assignee);
    const assignedTask = createTask(project, owner, {
      assigneeId: assignee.id
    });
    createTask(project, owner, { assigneeId: owner.id });

    const tasks = tasksService.listAssignedToUser(assignee.id);

    expect(tasks.map(t => t.id)).toEqual([assignedTask.id]);
  });
});
