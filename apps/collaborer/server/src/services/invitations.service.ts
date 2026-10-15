import { env } from '../config/env.js';
import { db } from '../db/index.js';
import { mailer } from '../mailer/index.js';
import type { Invitation, InvitationRole } from '../models/invitation.model.js';
import { invitationsRepository } from '../repositories/invitations.repository.js';
import { organizationMembersRepository } from '../repositories/organization-members.repository.js';
import { organizationsRepository } from '../repositories/organizations.repository.js';
import { usersRepository } from '../repositories/users.repository.js';
import {
  BadRequestError,
  ConflictError,
  NotFoundError
} from '../utils/errors.js';
import { generateOpaqueToken } from '../utils/tokens.js';
import { notificationsService } from './notifications.service.js';

const INVITATION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

function isExpired(invitation: Invitation): boolean {
  return new Date(invitation.expires_at).getTime() < Date.now();
}

export const invitationsService = {
  async create(
    organizationId: number,
    invitedBy: number,
    input: { email: string; role: InvitationRole }
  ): Promise<Invitation> {
    const alreadyMember = organizationMembersRepository.findByEmail(
      organizationId,
      input.email
    );
    if (alreadyMember) {
      throw new ConflictError(
        'ALREADY_MEMBER',
        'This person is already a member of the organization.'
      );
    }

    const pending = invitationsRepository.findPendingByOrganizationAndEmail(
      organizationId,
      input.email
    );
    if (pending && !isExpired(pending)) {
      throw new ConflictError(
        'INVITATION_ALREADY_PENDING',
        'An invitation is already pending for this email.'
      );
    }

    const invitation = invitationsRepository.create({
      organizationId,
      email: input.email,
      role: input.role,
      token: generateOpaqueToken(),
      invitedBy,
      expiresAt: new Date(Date.now() + INVITATION_TTL_MS).toISOString()
    });

    const organization = organizationsRepository.findById(organizationId);
    const organizationName = organization?.name ?? 'an organization';

    // If the invitee already has an account, also notify them in-app — they
    // may not check the email right away.
    const invitedUser = usersRepository.findByEmail(input.email);
    if (invitedUser) {
      notificationsService.notify(invitedUser.id, 'organization_invitation', {
        organizationId,
        organizationName,
        invitationToken: invitation.token
      });
    }

    const link = `${env.FRONTEND_URL}/invitations/${invitation.token}`;
    await mailer.send({
      to: input.email,
      subject: `You've been invited to join ${organizationName} on Collaborer`,
      text: `You've been invited to join ${organizationName} as ${input.role}.\n\nAccept the invitation: ${link}\n\nThis link expires in 7 days.`,
      html: `<p>You've been invited to join <strong>${organizationName}</strong> as <strong>${input.role}</strong>.</p><p><a href="${link}">${link}</a></p><p>This link expires in 7 days.</p>`
    });

    return invitation;
  },

  listPending(organizationId: number): Invitation[] {
    return invitationsRepository.listPendingByOrganization(organizationId);
  },

  getByToken(token: string) {
    const invitation = invitationsRepository.findByToken(token);
    if (!invitation) {
      throw new NotFoundError(
        'INVITATION_NOT_FOUND',
        'This invitation link is invalid.'
      );
    }

    const organization = organizationsRepository.findById(
      invitation.organization_id
    );

    return {
      email: invitation.email,
      role: invitation.role,
      organizationName: organization?.name ?? 'Unknown organization',
      expired: isExpired(invitation),
      accepted: invitation.accepted_at !== null
    };
  },

  accept(token: string, acceptingUserId: number): void {
    const invitation = invitationsRepository.findByToken(token);
    if (!invitation) {
      throw new NotFoundError(
        'INVITATION_NOT_FOUND',
        'This invitation link is invalid.'
      );
    }

    if (invitation.accepted_at) {
      throw new BadRequestError(
        'INVITATION_ALREADY_ACCEPTED',
        'This invitation has already been used.'
      );
    }

    if (isExpired(invitation)) {
      throw new BadRequestError(
        'INVITATION_EXPIRED',
        'This invitation has expired.'
      );
    }

    const acceptingUser = usersRepository.findById(acceptingUserId);
    if (!acceptingUser || acceptingUser.email !== invitation.email) {
      throw new BadRequestError(
        'INVITATION_EMAIL_MISMATCH',
        'This invitation was sent to a different email address.'
      );
    }

    const existingMembership = organizationMembersRepository.findMembership(
      invitation.organization_id,
      acceptingUserId
    );
    if (existingMembership) {
      throw new ConflictError(
        'ALREADY_MEMBER',
        'You are already a member of this organization.'
      );
    }

    db.transaction(() => {
      organizationMembersRepository.create(
        invitation.organization_id,
        acceptingUserId,
        invitation.role
      );
      invitationsRepository.markAccepted(invitation.id);
    })();
  }
};
