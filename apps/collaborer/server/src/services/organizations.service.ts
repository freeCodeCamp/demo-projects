import type { Organization } from '../models/organization.model.js';
import { organizationsRepository } from '../repositories/organizations.repository.js';
import { NotFoundError } from '../utils/errors.js';

export const organizationsService = {
  create(
    ownerId: number,
    input: { name: string; description?: string | null }
  ): Organization {
    return organizationsRepository.createWithOwner({
      name: input.name,
      description: input.description ?? null,
      ownerId
    });
  },

  listForUser(userId: number): Organization[] {
    return organizationsRepository.listForUser(userId);
  },

  getById(organizationId: number): Organization {
    const organization = organizationsRepository.findById(organizationId);
    if (!organization)
      throw new NotFoundError(
        'ORGANIZATION_NOT_FOUND',
        'Organization not found.'
      );
    return organization;
  },

  update(
    organizationId: number,
    input: {
      name?: string;
      description?: string | null;
      logoUrl?: string | null;
    }
  ): Organization {
    const existing = organizationsRepository.findById(organizationId);
    if (!existing)
      throw new NotFoundError(
        'ORGANIZATION_NOT_FOUND',
        'Organization not found.'
      );

    return organizationsRepository.update(organizationId, {
      name: input.name ?? existing.name,
      description:
        input.description !== undefined
          ? input.description
          : existing.description,
      logoUrl: input.logoUrl !== undefined ? input.logoUrl : existing.logo_url
    });
  },

  remove(organizationId: number): void {
    organizationsRepository.remove(organizationId);
  }
};
