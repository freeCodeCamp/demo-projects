import { beforeEach, describe, expect, it } from 'vitest';
import { organizationMembersService } from './organization-members.service.js';
import {
  addOrganizationMember,
  createOrganization,
  createUser
} from '../test-utils/factories.js';
import { resetTestDatabase } from '../test-utils/db.js';
import { notificationsRepository } from '../repositories/notifications.repository.js';
import { organizationMembersRepository } from '../repositories/organization-members.repository.js';

beforeEach(() => {
  resetTestDatabase();
});

describe('organizationMembersService.changeRole', () => {
  it('notifies the target user of the role change', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const member = createUser();
    addOrganizationMember(org, member, 'member');

    organizationMembersService.changeRole(
      org.id,
      owner.id,
      'owner',
      member.id,
      'admin'
    );

    const notifications = notificationsRepository.list(member.id, 20, 0);
    expect(notifications).toHaveLength(1);
    expect(notifications[0]?.type).toBe('organization_role_changed');
    expect(notifications[0]?.data).toMatchObject({
      organizationId: org.id,
      role: 'admin'
    });
  });

  it('never notifies the actor about their own action', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const admin = createUser();
    addOrganizationMember(org, admin, 'admin');

    // An admin acting on their own membership (e.g. self-demoting).
    organizationMembersService.changeRole(
      org.id,
      admin.id,
      'admin',
      admin.id,
      'member'
    );

    expect(notificationsRepository.count(admin.id)).toBe(0);
  });

  it('transferring ownership notifies the new owner and demotes the previous one', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const admin = createUser();
    addOrganizationMember(org, admin, 'admin');

    organizationMembersService.changeRole(
      org.id,
      owner.id,
      'owner',
      admin.id,
      'owner'
    );

    const notifications = notificationsRepository.list(admin.id, 20, 0);
    expect(notifications[0]).toMatchObject({
      type: 'organization_role_changed',
      data: { role: 'owner' }
    });
    expect(
      organizationMembersRepository.findMembership(org.id, owner.id)?.role
    ).toBe('admin');
    expect(
      organizationMembersRepository.findMembership(org.id, admin.id)?.role
    ).toBe('owner');
  });

  it("refuses to touch the owner's own role via this endpoint at all, even a no-op re-assignment to themselves", () => {
    const owner = createUser();
    const org = createOrganization(owner);

    expect(() =>
      organizationMembersService.changeRole(
        org.id,
        owner.id,
        'owner',
        owner.id,
        'owner'
      )
    ).toThrow(expect.objectContaining({ code: 'FORBIDDEN' }));
  });

  it('rejects a non-owner attempting to transfer ownership', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const admin = createUser();
    addOrganizationMember(org, admin, 'admin');
    const target = createUser();
    addOrganizationMember(org, target, 'member');

    expect(() =>
      organizationMembersService.changeRole(
        org.id,
        admin.id,
        'admin',
        target.id,
        'owner'
      )
    ).toThrow(expect.objectContaining({ code: 'FORBIDDEN' }));
  });
});

describe('organizationMembersService.remove', () => {
  it('removes the membership and notifies the removed user', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const member = createUser();
    addOrganizationMember(org, member, 'member');

    organizationMembersService.remove(org.id, owner.id, member.id);

    expect(
      organizationMembersRepository.findMembership(org.id, member.id)
    ).toBeUndefined();
    const notifications = notificationsRepository.list(member.id, 20, 0);
    expect(notifications[0]).toMatchObject({
      type: 'removed_from_organization',
      data: { organizationId: org.id }
    });
  });

  it('does not self-notify when a user removes themselves', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const admin = createUser();
    addOrganizationMember(org, admin, 'admin');

    organizationMembersService.remove(org.id, admin.id, admin.id);

    expect(notificationsRepository.count(admin.id)).toBe(0);
  });

  it('refuses to remove the organization owner', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const admin = createUser();
    addOrganizationMember(org, admin, 'admin');

    expect(() =>
      organizationMembersService.remove(org.id, admin.id, owner.id)
    ).toThrow(expect.objectContaining({ code: 'FORBIDDEN' }));
    expect(
      organizationMembersRepository.findMembership(org.id, owner.id)
    ).toBeDefined();
  });
});
