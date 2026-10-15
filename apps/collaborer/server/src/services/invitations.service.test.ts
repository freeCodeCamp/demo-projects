import { beforeEach, describe, expect, it } from 'vitest';
import { invitationsService } from './invitations.service.js';
import {
  addOrganizationMember,
  createOrganization,
  createUser
} from '../test-utils/factories.js';
import { resetTestDatabase } from '../test-utils/db.js';
import { invitationsRepository } from '../repositories/invitations.repository.js';
import { organizationMembersRepository } from '../repositories/organization-members.repository.js';
import { AppError } from '../utils/errors.js';

const DAY_MS = 24 * 60 * 60 * 1000;

function inviteToOrganization(
  organizationId: number,
  invitedBy: number,
  overrides: Partial<{ email: string; expiresAt: string }> = {}
) {
  return invitationsRepository.create({
    organizationId,
    email: overrides.email ?? 'invitee@example.com',
    role: 'member',
    token: `token-${Math.random().toString(36).slice(2)}`,
    invitedBy,
    expiresAt:
      overrides.expiresAt ?? new Date(Date.now() + 7 * DAY_MS).toISOString()
  });
}

beforeEach(() => {
  resetTestDatabase();
});

describe('invitationsService.accept', () => {
  it('creates the organization membership at the invited role and marks the invitation accepted', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const invitee = createUser({ email: 'invitee@example.com' });
    const invitation = inviteToOrganization(org.id, owner.id, {
      email: invitee.email
    });

    invitationsService.accept(invitation.token, invitee.id);

    const membership = organizationMembersRepository.findMembership(
      org.id,
      invitee.id
    );
    expect(membership?.role).toBe('member');

    const updated = invitationsRepository.findByToken(invitation.token);
    expect(updated?.accepted_at).not.toBeNull();
  });

  it('throws INVITATION_NOT_FOUND for an unknown token', () => {
    const invitee = createUser();

    expect(() =>
      invitationsService.accept('does-not-exist', invitee.id)
    ).toThrow(expect.objectContaining({ code: 'INVITATION_NOT_FOUND' }));
  });

  it('throws INVITATION_ALREADY_ACCEPTED if the invitation was already used', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const invitee = createUser({ email: 'invitee@example.com' });
    const invitation = inviteToOrganization(org.id, owner.id, {
      email: invitee.email
    });

    invitationsService.accept(invitation.token, invitee.id);

    // The already-accepted check runs before the email-mismatch check, so
    // this fires regardless of who's attempting the second acceptance.
    let thrown: unknown;
    try {
      invitationsService.accept(invitation.token, invitee.id);
    } catch (error) {
      thrown = error;
    }
    expect(thrown).toBeInstanceOf(AppError);
    expect((thrown as AppError).code).toBe('INVITATION_ALREADY_ACCEPTED');
  });

  it('throws INVITATION_EXPIRED for an invitation past its expiry', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const invitee = createUser({ email: 'invitee@example.com' });
    const invitation = inviteToOrganization(org.id, owner.id, {
      email: invitee.email,
      expiresAt: new Date(Date.now() - DAY_MS).toISOString()
    });

    expect(() =>
      invitationsService.accept(invitation.token, invitee.id)
    ).toThrow(expect.objectContaining({ code: 'INVITATION_EXPIRED' }));
  });

  it("throws INVITATION_EMAIL_MISMATCH when the accepting account's email differs", () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const invitation = inviteToOrganization(org.id, owner.id, {
      email: 'invitee@example.com'
    });
    const wrongUser = createUser({ email: 'someone-else@example.com' });

    expect(() =>
      invitationsService.accept(invitation.token, wrongUser.id)
    ).toThrow(expect.objectContaining({ code: 'INVITATION_EMAIL_MISMATCH' }));
  });

  it('throws ALREADY_MEMBER when the accepting user already belongs to the organization', () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const invitee = createUser({ email: 'invitee@example.com' });
    addOrganizationMember(org, invitee, 'member');
    const invitation = inviteToOrganization(org.id, owner.id, {
      email: invitee.email
    });

    expect(() =>
      invitationsService.accept(invitation.token, invitee.id)
    ).toThrow(expect.objectContaining({ code: 'ALREADY_MEMBER' }));
  });
});
