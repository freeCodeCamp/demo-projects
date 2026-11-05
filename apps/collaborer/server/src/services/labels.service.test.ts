import { beforeEach, describe, expect, it } from 'vitest';
import { labelsService } from './labels.service.js';
import {
  createLabel,
  createOrganization,
  createProject,
  createUser
} from '../test-utils/factories.js';
import { resetTestDatabase } from '../test-utils/db.js';
import { labelsRepository } from '../repositories/labels.repository.js';

beforeEach(() => {
  resetTestDatabase();
});

describe('labelsService', () => {
  it('creates and lists labels for a project', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);

    const label = labelsService.create(project.id, {
      name: 'bug',
      color: '#ff0000'
    });

    expect(labelsService.listForProject(project.id)).toEqual([label]);
  });

  it('updates only the fields provided', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const label = createLabel(project, { name: 'bug', color: '#ff0000' });

    const updated = labelsService.update(label.id, { color: '#00ff00' });

    expect(updated).toMatchObject({ name: 'bug', color: '#00ff00' });
  });

  it('throws LABEL_NOT_FOUND when updating a missing label', () => {
    expect(() => labelsService.update(999999, { name: 'x' })).toThrow(
      expect.objectContaining({ code: 'LABEL_NOT_FOUND' })
    );
  });

  it('removes a label', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const label = createLabel(project);

    labelsService.remove(label.id);

    expect(labelsRepository.findById(label.id)).toBeUndefined();
  });
});
