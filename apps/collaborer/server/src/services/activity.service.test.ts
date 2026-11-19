import { beforeEach, describe, expect, it } from 'vitest';
import { activityService } from './activity.service.js';
import {
  createOrganization,
  createProject,
  createUser
} from '../test-utils/factories.js';
import { resetTestDatabase } from '../test-utils/db.js';

beforeEach(() => {
  resetTestDatabase();
});

describe('activityService', () => {
  it('records an entry and lists it back for the project, paginated', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);

    activityService.record({
      organizationId: org.id,
      projectId: project.id,
      actorId: owner.id,
      action: 'task.created',
      entityType: 'task',
      entityId: 1,
      metadata: { title: 'Fix bug' }
    });

    const result = activityService.listForProject(project.id, {
      page: 1,
      limit: 20,
      offset: 0
    });

    expect(result.data).toHaveLength(1);
    expect(result.data[0]).toMatchObject({
      action: 'task.created',
      metadata: { title: 'Fix bug' },
      actor_name: owner.name
    });
    expect(result.pagination.total).toBe(1);
  });

  it('only returns entries for the requested project', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const projectA = createProject(org, owner);
    const projectB = createProject(org, owner);

    activityService.record({
      organizationId: org.id,
      projectId: projectA.id,
      actorId: owner.id,
      action: 'task.created',
      entityType: 'task',
      entityId: 1
    });
    activityService.record({
      organizationId: org.id,
      projectId: projectB.id,
      actorId: owner.id,
      action: 'task.created',
      entityType: 'task',
      entityId: 2
    });

    const result = activityService.listForProject(projectA.id, {
      page: 1,
      limit: 20,
      offset: 0
    });

    expect(result.data).toHaveLength(1);
    expect(result.data[0]?.project_id).toBe(projectA.id);
  });
});
