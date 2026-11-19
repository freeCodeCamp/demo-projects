import { beforeEach, describe, expect, it } from 'vitest';
import { projectMembersService } from './project-members.service.js';
import {
  addOrganizationMember,
  createOrganization,
  createProject,
  createUser
} from '../test-utils/factories.js';
import { resetTestDatabase } from '../test-utils/db.js';
import { notificationsRepository } from '../repositories/notifications.repository.js';
import { projectMembersRepository } from '../repositories/project-members.repository.js';

beforeEach(() => {
  resetTestDatabase();
});

describe('projectMembersService.add', () => {
  it('adds the member and notifies them', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const member = createUser();
    addOrganizationMember(org, member, 'member');

    projectMembersService.add(project.id, owner.id, member.id);

    expect(projectMembersRepository.isMember(project.id, member.id)).toBe(true);
    const notifications = notificationsRepository.list(member.id, 20, 0);
    expect(notifications[0]).toMatchObject({
      type: 'added_to_project',
      data: { projectId: project.id }
    });
  });

  it('does not self-notify when the actor adds themselves', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const admin = createUser();
    addOrganizationMember(org, admin, 'admin');

    projectMembersService.add(project.id, admin.id, admin.id);

    expect(notificationsRepository.count(admin.id)).toBe(0);
  });

  it("rejects adding a user who isn't an organization member first", () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const outsider = createUser();

    expect(() =>
      projectMembersService.add(project.id, owner.id, outsider.id)
    ).toThrow(expect.objectContaining({ code: 'NOT_ORGANIZATION_MEMBER' }));
  });

  it('rejects adding an already-existing project member', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const member = createUser();
    addOrganizationMember(org, member, 'member');
    projectMembersService.add(project.id, owner.id, member.id);

    expect(() =>
      projectMembersService.add(project.id, owner.id, member.id)
    ).toThrow(expect.objectContaining({ code: 'ALREADY_PROJECT_MEMBER' }));
  });
});

describe('projectMembersService.remove', () => {
  it('removes the member and notifies them', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const member = createUser();
    addOrganizationMember(org, member, 'member');
    projectMembersService.add(project.id, owner.id, member.id);

    projectMembersService.remove(project.id, owner.id, member.id);

    expect(projectMembersRepository.isMember(project.id, member.id)).toBe(
      false
    );
    // add() above also notifies (added_to_project) — assert the removal
    // notification exists rather than assuming list order, since both land
    // within the same millisecond and created_at DESC doesn't tie-break.
    const notifications = notificationsRepository.list(member.id, 20, 0);
    expect(notifications).toContainEqual(
      expect.objectContaining({
        type: 'removed_from_project',
        data: expect.objectContaining({ projectId: project.id })
      })
    );
  });

  it('does not self-notify when a member removes themselves', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const member = createUser();
    addOrganizationMember(org, member, 'member');
    projectMembersService.add(project.id, owner.id, member.id);
    // add() above (by the owner, not the member) does notify — capture that
    // baseline so the assertion below is about the self-removal specifically.
    const countAfterAdd = notificationsRepository.count(member.id);

    projectMembersService.remove(project.id, member.id, member.id);

    expect(notificationsRepository.count(member.id)).toBe(countAfterAdd);
  });
});
