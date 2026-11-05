import { db } from '../db/index.js';
import type { OrganizationRole } from '../models/organization-member.model.js';
import { organizationMembersRepository } from '../repositories/organization-members.repository.js';
import { organizationsRepository } from '../repositories/organizations.repository.js';
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError
} from '../utils/errors.js';
import {
  buildPaginatedResult,
  type PaginationParams
} from '../utils/pagination.js';
import { notificationsService } from './notifications.service.js';

export const organizationMembersService = {
  list(organizationId: number, pagination: PaginationParams) {
    const members = organizationMembersRepository.list(
      organizationId,
      pagination.limit,
      pagination.offset
    );
    const total = organizationMembersRepository.count(organizationId);
    return buildPaginatedResult(members, total, pagination);
  },

  changeRole(
    organizationId: number,
    actingUserId: number,
    actingRole: OrganizationRole,
    targetUserId: number,
    newRole: OrganizationRole
  ): void {
    const target = organizationMembersRepository.findMembership(
      organizationId,
      targetUserId
    );
    if (!target) {
      throw new NotFoundError(
        'MEMBER_NOT_FOUND',
        'This user is not a member of the organization.'
      );
    }

    if (target.role === 'owner') {
      throw new ForbiddenError(
        "The organization owner's role cannot be changed directly."
      );
    }

    const organization = organizationsRepository.findById(organizationId);
    const organizationName = organization?.name ?? 'an organization';

    if (newRole === 'owner') {
      if (actingRole !== 'owner') {
        throw new ForbiddenError(
          'Only the current owner can transfer ownership.'
        );
      }
      if (targetUserId === actingUserId) {
        throw new BadRequestError(
          'ALREADY_OWNER',
          'You already own this organization.'
        );
      }

      db.transaction(() => {
        organizationMembersRepository.updateRole(
          organizationId,
          actingUserId,
          'admin'
        );
        organizationMembersRepository.updateRole(
          organizationId,
          targetUserId,
          'owner'
        );
        organizationsRepository.updateOwner(organizationId, targetUserId);

        notificationsService.notify(targetUserId, 'organization_role_changed', {
          organizationId,
          organizationName,
          role: 'owner'
        });
      })();
      return;
    }

    organizationMembersRepository.updateRole(
      organizationId,
      targetUserId,
      newRole
    );

    // Never notify the actor about the outcome of their own action — matches
    // every other notify() call site in the codebase.
    if (targetUserId !== actingUserId) {
      notificationsService.notify(targetUserId, 'organization_role_changed', {
        organizationId,
        organizationName,
        role: newRole
      });
    }
  },

  remove(
    organizationId: number,
    actingUserId: number,
    targetUserId: number
  ): void {
    const target = organizationMembersRepository.findMembership(
      organizationId,
      targetUserId
    );
    if (!target) {
      throw new NotFoundError(
        'MEMBER_NOT_FOUND',
        'This user is not a member of the organization.'
      );
    }

    if (target.role === 'owner') {
      throw new ForbiddenError('The organization owner cannot be removed.');
    }

    organizationMembersRepository.remove(organizationId, targetUserId);

    // Never notify the actor about the outcome of their own action — matches
    // every other notify() call site in the codebase (leaving on your own
    // shouldn't self-notify either).
    if (targetUserId !== actingUserId) {
      const organization = organizationsRepository.findById(organizationId);
      notificationsService.notify(targetUserId, 'removed_from_organization', {
        organizationId,
        organizationName: organization?.name ?? 'an organization'
      });
    }
  }
};
