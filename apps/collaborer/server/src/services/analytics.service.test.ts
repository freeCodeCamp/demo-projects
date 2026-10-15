import { beforeEach, describe, expect, it } from 'vitest';
import { analyticsService, bucketByWeek } from './analytics.service.js';
import { tasksService } from './tasks.service.js';
import {
  addOrganizationMember,
  addProjectMember,
  createOrganization,
  createProject,
  createTask,
  createUser
} from '../test-utils/factories.js';
import { resetTestDatabase } from '../test-utils/db.js';
import { subtasksRepository } from '../repositories/subtasks.repository.js';

const DAY_MS = 24 * 60 * 60 * 1000;

beforeEach(() => {
  resetTestDatabase();
});

describe('bucketByWeek', () => {
  it('buckets timestamps into 8 rolling 7-day periods ending now', () => {
    const now = Date.now();
    const timestamps = [
      new Date(now).toISOString(), // this period
      new Date(now - 3 * DAY_MS).toISOString(), // this period
      new Date(now - 7 * DAY_MS).toISOString(), // previous period
      new Date(now - 54 * DAY_MS).toISOString() // oldest period (within range)
    ];

    const buckets = bucketByWeek(timestamps, now);

    expect(buckets).toHaveLength(8);
    expect(buckets[7]!.count).toBe(2); // most recent period
    expect(buckets[6]!.count).toBe(1); // previous period
    expect(buckets[0]!.count).toBe(1); // oldest period still in range
    expect(buckets.reduce((sum, b) => sum + b.count, 0)).toBe(4);
  });

  it('drops timestamps older than the 8-period window', () => {
    const now = Date.now();
    const buckets = bucketByWeek(
      [new Date(now - 100 * DAY_MS).toISOString()],
      now
    );

    expect(buckets.reduce((sum, b) => sum + b.count, 0)).toBe(0);
  });

  it('returns all-zero buckets for an empty input', () => {
    const buckets = bucketByWeek([]);

    expect(buckets.every(b => b.count === 0)).toBe(true);
  });
});

describe('analyticsService.getAnalytics', () => {
  it('tasksByStatus counts tasks by status, defaulting statuses with zero tasks to 0', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    createTask(project, owner, { status: 'todo' });
    createTask(project, owner, { status: 'todo' });
    createTask(project, owner, { status: 'done' });

    const result = analyticsService.getAnalytics(org.id, owner.id, 'owner');

    expect(result.tasksByStatus).toEqual({
      backlog: 0,
      todo: 2,
      in_progress: 0,
      in_review: 0,
      done: 1
    });
  });

  it('tasksByStatus respects the manager/member visibility split', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const visible = createProject(org, owner);
    const hidden = createProject(org, owner);
    createTask(visible, owner, { status: 'todo' });
    createTask(hidden, owner, { status: 'todo' });
    const member = createUser();
    addOrganizationMember(org, member, 'member');
    addProjectMember(visible, member);

    expect(
      analyticsService.getAnalytics(org.id, owner.id, 'owner').tasksByStatus
        .todo
    ).toBe(2);
    expect(
      analyticsService.getAnalytics(org.id, member.id, 'member').tasksByStatus
        .todo
    ).toBe(1);
  });

  it('tasksByStatus does not count tasks from a different organization', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    createTask(project, owner, { status: 'todo' });

    const otherOwner = createUser();
    const otherOrg = createOrganization(otherOwner);
    const otherProject = createProject(otherOrg, otherOwner);
    createTask(otherProject, otherOwner, { status: 'todo' });
    createTask(otherProject, otherOwner, { status: 'todo' });

    const result = analyticsService.getAnalytics(org.id, owner.id, 'owner');

    expect(result.tasksByStatus.todo).toBe(1);
  });

  it('tasksByPriority counts tasks by priority, zero-filling untouched priorities', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    createTask(project, owner, { priority: 'high' });
    createTask(project, owner, { priority: 'high' });
    createTask(project, owner, { priority: 'urgent' });

    const result = analyticsService.getAnalytics(org.id, owner.id, 'owner');

    expect(result.tasksByPriority).toEqual({
      low: 0,
      medium: 0,
      high: 2,
      urgent: 1
    });
  });

  it('tasksByPriority respects the manager/member visibility split', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const visible = createProject(org, owner);
    const hidden = createProject(org, owner);
    createTask(visible, owner, { priority: 'urgent' });
    createTask(hidden, owner, { priority: 'urgent' });
    const member = createUser();
    addOrganizationMember(org, member, 'member');
    addProjectMember(visible, member);

    expect(
      analyticsService.getAnalytics(org.id, owner.id, 'owner').tasksByPriority
        .urgent
    ).toBe(2);
    expect(
      analyticsService.getAnalytics(org.id, member.id, 'member').tasksByPriority
        .urgent
    ).toBe(1);
  });

  it('completionsOverTime counts task.status_changed-to-done events, scoped by visibility', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const visible = createProject(org, owner);
    const hidden = createProject(org, owner);
    const visibleTask = createTask(visible, owner, { status: 'in_progress' });
    const hiddenTask = createTask(hidden, owner, { status: 'in_progress' });
    tasksService.update(visibleTask.id, visible.id, org.id, owner.id, {
      status: 'done'
    });
    tasksService.update(hiddenTask.id, hidden.id, org.id, owner.id, {
      status: 'done'
    });
    const member = createUser();
    addOrganizationMember(org, member, 'member');
    addProjectMember(visible, member);

    const asOwner = analyticsService.getAnalytics(org.id, owner.id, 'owner');
    const asMember = analyticsService.getAnalytics(org.id, member.id, 'member');

    expect(
      asOwner.completionsOverTime.reduce((sum, b) => sum + b.count, 0)
    ).toBe(2);
    expect(
      asMember.completionsOverTime.reduce((sum, b) => sum + b.count, 0)
    ).toBe(1);
    // Both completions just happened, so they land in the most recent bucket.
    expect(asOwner.completionsOverTime[7]!.count).toBe(2);
  });

  it('completionsOverTime does not count status changes to anything other than done', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const task = createTask(project, owner, { status: 'backlog' });
    tasksService.update(task.id, project.id, org.id, owner.id, {
      status: 'in_progress'
    });

    const result = analyticsService.getAnalytics(org.id, owner.id, 'owner');

    expect(
      result.completionsOverTime.reduce((sum, b) => sum + b.count, 0)
    ).toBe(0);
  });

  it('activityOverTime counts every activity entry, scoped by visibility', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const visible = createProject(org, owner);
    const hidden = createProject(org, owner);
    const member = createUser();
    addOrganizationMember(org, member, 'member');
    addProjectMember(visible, member);

    // tasksService.create is what actually records a "task.created" activity entry.
    tasksService.create(visible.id, org.id, owner.id, {
      title: 'Visible task'
    });
    tasksService.create(hidden.id, org.id, owner.id, { title: 'Hidden task' });

    const asOwner = analyticsService.getAnalytics(org.id, owner.id, 'owner');
    const asMember = analyticsService.getAnalytics(org.id, member.id, 'member');

    expect(asOwner.activityOverTime.reduce((sum, b) => sum + b.count, 0)).toBe(
      2
    );
    expect(asMember.activityOverTime.reduce((sum, b) => sum + b.count, 0)).toBe(
      1
    );
  });

  it("overdueVsOnTrack counts a task overdue only if it has a past due date and isn't done", () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const yesterday = new Date(Date.now() - DAY_MS).toISOString();
    const tomorrow = new Date(Date.now() + DAY_MS).toISOString();
    createTask(project, owner, { status: 'todo', dueDate: yesterday }); // overdue
    createTask(project, owner, { status: 'done', dueDate: yesterday }); // done — not overdue
    createTask(project, owner, { status: 'todo', dueDate: tomorrow }); // future — on track
    createTask(project, owner, { status: 'todo', dueDate: null }); // no due date — on track

    const result = analyticsService.getAnalytics(org.id, owner.id, 'owner');

    expect(result.overdueVsOnTrack).toEqual({ overdue: 1, onTrack: 3 });
  });

  it('overdueVsOnTrack returns all-zero when the org has no tasks', () => {
    const owner = createUser();
    const org = createOrganization(owner);

    const result = analyticsService.getAnalytics(org.id, owner.id, 'owner');

    expect(result.overdueVsOnTrack).toEqual({ overdue: 0, onTrack: 0 });
  });

  it('subtaskCompletionRate counts completed vs remaining subtasks, scoped by visibility', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const visible = createProject(org, owner);
    const hidden = createProject(org, owner);
    const visibleTask = createTask(visible, owner);
    const hiddenTask = createTask(hidden, owner);
    const completedSubtask = subtasksRepository.create(
      visibleTask.id,
      'done one'
    );
    subtasksRepository.update(completedSubtask.id, 'done one', true);
    subtasksRepository.create(visibleTask.id, 'not done one');
    subtasksRepository.create(hiddenTask.id, 'hidden one');
    const member = createUser();
    addOrganizationMember(org, member, 'member');
    addProjectMember(visible, member);

    const asOwner = analyticsService.getAnalytics(org.id, owner.id, 'owner');
    const asMember = analyticsService.getAnalytics(org.id, member.id, 'member');

    expect(asOwner.subtaskCompletionRate).toEqual({
      completed: 1,
      remaining: 2
    });
    expect(asMember.subtaskCompletionRate).toEqual({
      completed: 1,
      remaining: 1
    });
  });

  it('subtaskCompletionRate returns all-zero when there are no subtasks', () => {
    const owner = createUser();
    const org = createOrganization(owner);

    const result = analyticsService.getAnalytics(org.id, owner.id, 'owner');

    expect(result.subtaskCompletionRate).toEqual({
      completed: 0,
      remaining: 0
    });
  });
});
