import { beforeEach, describe, expect, it } from 'vitest';
import { commentsService } from './comments.service.js';
import {
  addOrganizationMember,
  addProjectMember,
  createOrganization,
  createProject,
  createTask,
  createUser
} from '../test-utils/factories.js';
import { resetTestDatabase } from '../test-utils/db.js';
import { activityRepository } from '../repositories/activity.repository.js';
import { notificationsRepository } from '../repositories/notifications.repository.js';

beforeEach(() => {
  resetTestDatabase();
});

describe('commentsService.create', () => {
  it('creates the comment and records a comment.created activity entry', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const task = createTask(project, owner);

    const comment = commentsService.create(
      task.id,
      project.id,
      org.id,
      owner.id,
      'Looks good'
    );

    expect(comment.body).toBe('Looks good');
    expect(activityRepository.listByProject(project.id, 20, 0)).toContainEqual(
      expect.objectContaining({ action: 'comment.created' })
    );
  });

  it('notifies a @mentioned user who has project access, but not a self-mention', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const task = createTask(project, owner);
    const mentioned = createUser({ username: 'carol' });
    addOrganizationMember(org, mentioned, 'member');
    addProjectMember(project, mentioned);

    commentsService.create(
      task.id,
      project.id,
      org.id,
      owner.id,
      'cc @carol and @alice-does-not-exist'
    );

    expect(notificationsRepository.list(mentioned.id, 20, 0)).toContainEqual(
      expect.objectContaining({ type: 'mentioned_in_comment' })
    );

    // Self-mention: shouldn't notify the author about their own comment.
    commentsService.create(
      task.id,
      project.id,
      org.id,
      mentioned.id,
      'note to self @carol'
    );
    expect(notificationsRepository.count(mentioned.id)).toBe(1); // unchanged
  });

  it('does not notify a mentioned username that has no access to the project', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const task = createTask(project, owner);
    const outsider = createUser({ username: 'dave' });
    createOrganization(outsider); // dave belongs to a different org entirely

    commentsService.create(task.id, project.id, org.id, owner.id, 'hey @dave');

    expect(notificationsRepository.count(outsider.id)).toBe(0);
  });

  it("notifies the task's creator and assignee (comment_added), excluding the author", () => {
    const creator = createUser();
    const org = createOrganization(creator);
    const project = createProject(org, creator);
    const assignee = createUser();
    const commenter = createUser();
    for (const u of [assignee, commenter]) {
      addOrganizationMember(org, u, 'member');
      addProjectMember(project, u);
    }
    const task = createTask(project, creator, { assigneeId: assignee.id });

    commentsService.create(
      task.id,
      project.id,
      org.id,
      commenter.id,
      'any updates?'
    );

    expect(notificationsRepository.list(creator.id, 20, 0)).toContainEqual(
      expect.objectContaining({ type: 'comment_added' })
    );
    expect(notificationsRepository.list(assignee.id, 20, 0)).toContainEqual(
      expect.objectContaining({ type: 'comment_added' })
    );
    expect(notificationsRepository.count(commenter.id)).toBe(0);
  });

  it("does not double-notify a user who is both mentioned and the task's creator/assignee", () => {
    const creator = createUser({ username: 'erin' });
    const org = createOrganization(creator);
    const project = createProject(org, creator);
    const commenter = createUser();
    addOrganizationMember(org, commenter, 'member');
    addProjectMember(project, commenter);
    const task = createTask(project, creator); // creator is also the (implicit) assignee target of interest

    commentsService.create(
      task.id,
      project.id,
      org.id,
      commenter.id,
      'cc @erin'
    );

    // Exactly one notification (mentioned_in_comment took priority), not two.
    expect(notificationsRepository.count(creator.id)).toBe(1);
    expect(notificationsRepository.list(creator.id, 20, 0)[0]?.type).toBe(
      'mentioned_in_comment'
    );
  });

  it('throws TASK_NOT_FOUND for a missing task', () => {
    const user = createUser();
    expect(() => commentsService.create(999999, 1, 1, user.id, 'hi')).toThrow(
      expect.objectContaining({ code: 'TASK_NOT_FOUND' })
    );
  });
});

describe('commentsService.update / remove', () => {
  it('lets the author edit their own comment', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const task = createTask(project, owner);
    const comment = commentsService.create(
      task.id,
      project.id,
      org.id,
      owner.id,
      'original'
    );

    const updated = commentsService.update(comment.id, owner.id, 'edited');

    expect(updated.body).toBe('edited');
  });

  it("rejects editing someone else's comment", () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const task = createTask(project, owner);
    const comment = commentsService.create(
      task.id,
      project.id,
      org.id,
      owner.id,
      'original'
    );
    const someoneElse = createUser();

    expect(() =>
      commentsService.update(comment.id, someoneElse.id, 'hijacked')
    ).toThrow(expect.objectContaining({ code: 'FORBIDDEN' }));
  });

  it('lets the author delete their own comment, and rejects others', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const task = createTask(project, owner);
    const comment = commentsService.create(
      task.id,
      project.id,
      org.id,
      owner.id,
      'original'
    );
    const someoneElse = createUser();

    expect(() => commentsService.remove(comment.id, someoneElse.id)).toThrow(
      expect.objectContaining({ code: 'FORBIDDEN' })
    );

    commentsService.remove(comment.id, owner.id);
    expect(() => commentsService.update(comment.id, owner.id, 'x')).toThrow(
      expect.objectContaining({ code: 'COMMENT_NOT_FOUND' })
    );
  });
});
