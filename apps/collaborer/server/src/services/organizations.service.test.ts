import { beforeEach, describe, expect, it } from 'vitest';
import { organizationsService } from './organizations.service.js';
import { createOrganization, createUser } from '../test-utils/factories.js';
import { resetTestDatabase } from '../test-utils/db.js';
import { organizationsRepository } from '../repositories/organizations.repository.js';

beforeEach(() => {
  resetTestDatabase();
});

describe('organizationsService', () => {
  it('create makes the creator the owner', () => {
    const user = createUser();

    const org = organizationsService.create(user.id, { name: 'Acme' });

    expect(org.owner_id).toBe(user.id);
    expect(organizationsService.listForUser(user.id)).toEqual([org]);
  });

  it('listForUser only returns organizations the user belongs to', () => {
    const userA = createUser();
    const userB = createUser();
    const orgA = organizationsService.create(userA.id, { name: 'Org A' });
    organizationsService.create(userB.id, { name: 'Org B' });

    expect(organizationsService.listForUser(userA.id)).toEqual([orgA]);
  });

  it('getById throws ORGANIZATION_NOT_FOUND for a missing org', () => {
    expect(() => organizationsService.getById(999999)).toThrow(
      expect.objectContaining({ code: 'ORGANIZATION_NOT_FOUND' })
    );
  });

  it('update only changes the fields provided', () => {
    const owner = createUser();
    const org = createOrganization(owner, { name: 'Original' });

    const updated = organizationsService.update(org.id, {
      description: 'New description'
    });

    expect(updated).toMatchObject({
      name: 'Original',
      description: 'New description'
    });
  });

  it('remove deletes the organization', () => {
    const owner = createUser();
    const org = createOrganization(owner);

    organizationsService.remove(org.id);

    expect(organizationsRepository.findById(org.id)).toBeUndefined();
  });
});
