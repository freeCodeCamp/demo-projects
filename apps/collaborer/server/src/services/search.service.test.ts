import { beforeEach, describe, expect, it } from 'vitest';
import { searchService } from './search.service.js';
import { tasksService } from './tasks.service.js';
import {
  addOrganizationMember,
  addProjectMember,
  createOrganization,
  createProject,
  createUser
} from '../test-utils/factories.js';
import { resetTestDatabase } from '../test-utils/db.js';

beforeEach(() => {
  resetTestDatabase();
});

describe('searchService.search', () => {
  it('matches projects and tasks by a substring of their name/title', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner, { name: 'Website Redesign' });
    createProject(org, owner, { name: 'Mobile App' });
    tasksService.create(project.id, org.id, owner.id, {
      title: 'Fix homepage hero'
    });

    const results = searchService.search(org.id, owner.id, 'owner', 'website');

    expect(results.projects?.map(p => p.name)).toEqual(['Website Redesign']);
  });

  it('restricts type=projects / type=tasks to just that kind', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner, { name: 'search-term project' });
    tasksService.create(project.id, org.id, owner.id, {
      title: 'search-term task'
    });

    const projectsOnly = searchService.search(
      org.id,
      owner.id,
      'owner',
      'search-term',
      'projects'
    );
    expect(projectsOnly.projects).toHaveLength(1);
    expect(projectsOnly.tasks).toBeUndefined();

    const tasksOnly = searchService.search(
      org.id,
      owner.id,
      'owner',
      'search-term',
      'tasks'
    );
    expect(tasksOnly.tasks).toHaveLength(1);
    expect(tasksOnly.projects).toBeUndefined();
  });

  it('an org owner/admin sees results across every project; a plain member only sees their own', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const visibleProject = createProject(org, owner, {
      name: 'shared-term visible'
    });
    createProject(org, owner, { name: 'shared-term hidden' });
    const member = createUser();
    addOrganizationMember(org, member, 'member');
    addProjectMember(visibleProject, member); // never added to the "hidden" project

    const asOwner = searchService.search(
      org.id,
      owner.id,
      'owner',
      'shared-term'
    );
    expect(asOwner.projects).toHaveLength(2);

    const asMember = searchService.search(
      org.id,
      member.id,
      'member',
      'shared-term'
    );
    expect(asMember.projects?.map(p => p.id)).toEqual([visibleProject.id]);
  });

  it('escapes literal % and _ in the query instead of treating them as SQL wildcards', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    createProject(org, owner, { name: '100% done' });
    createProject(org, owner, { name: '100X done' }); // would also match a naive LIKE '%100%%'

    const results = searchService.search(org.id, owner.id, 'owner', '100%');

    expect(results.projects?.map(p => p.name)).toEqual(['100% done']);
  });
});
