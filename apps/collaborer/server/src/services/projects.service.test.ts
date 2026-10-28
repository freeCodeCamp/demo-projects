import { beforeEach, describe, expect, it } from 'vitest';
import { projectsService } from './projects.service.js';
import {
  addOrganizationMember,
  addProjectMember,
  createOrganization,
  createProject,
  createUser
} from '../test-utils/factories.js';
import { resetTestDatabase } from '../test-utils/db.js';
import { projectMembersRepository } from '../repositories/project-members.repository.js';
import { projectsRepository } from '../repositories/projects.repository.js';

beforeEach(() => {
  resetTestDatabase();
});

describe('projectsService.create', () => {
  it('creates the project and adds the creator as an explicit project member', () => {
    const owner = createUser();
    const org = createOrganization(owner);

    const project = projectsService.create(org.id, owner.id, {
      name: 'Website'
    });

    expect(project).toMatchObject({
      organization_id: org.id,
      name: 'Website',
      status: 'planning'
    });
    expect(projectMembersRepository.isMember(project.id, owner.id)).toBe(true);
  });
});

describe('projectsService.listForOrganization', () => {
  it('returns every project for an owner/admin, but only explicit memberships for a plain member', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const visible = createProject(org, owner);
    const hidden = createProject(org, owner);
    const member = createUser();
    addOrganizationMember(org, member, 'member');
    addProjectMember(visible, member);

    expect(
      projectsService
        .listForOrganization(org.id, owner.id, 'owner')
        .map(p => p.id)
        .sort()
    ).toEqual([visible.id, hidden.id].sort());
    expect(
      projectsService.listForOrganization(org.id, member.id, 'member')
    ).toEqual([visible]);
  });
});

describe('projectsService.getById / update / remove', () => {
  it('getById throws PROJECT_NOT_FOUND for a missing project', () => {
    expect(() => projectsService.getById(999999)).toThrow(
      expect.objectContaining({ code: 'PROJECT_NOT_FOUND' })
    );
  });

  it('update only changes the fields provided', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner, { name: 'Original' });

    const updated = projectsService.update(project.id, { status: 'active' });

    expect(updated).toMatchObject({ name: 'Original', status: 'active' });
  });

  it('remove deletes the project', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);

    projectsService.remove(project.id);

    expect(projectsRepository.findById(project.id)).toBeUndefined();
  });
});
