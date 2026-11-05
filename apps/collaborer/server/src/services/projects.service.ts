import { db } from '../db/index.js';
import type { OrganizationRole } from '../models/organization-member.model.js';
import type { Project, ProjectStatus } from '../models/project.model.js';
import { projectMembersRepository } from '../repositories/project-members.repository.js';
import { projectsRepository } from '../repositories/projects.repository.js';
import { NotFoundError } from '../utils/errors.js';

export const projectsService = {
  create(
    organizationId: number,
    createdBy: number,
    input: {
      name: string;
      description?: string | null;
      status?: ProjectStatus;
    }
  ): Project {
    return db.transaction(() => {
      const project = projectsRepository.create({
        organizationId,
        name: input.name,
        description: input.description ?? null,
        status: input.status ?? 'planning',
        createdBy
      });
      // The creator is always added as an explicit project member, even though
      // owners/admins already have implicit access — keeps the member list accurate.
      projectMembersRepository.add(project.id, createdBy);
      return project;
    })();
  },

  listForOrganization(
    organizationId: number,
    requestingUserId: number,
    requestingRole: OrganizationRole
  ): Project[] {
    if (requestingRole === 'owner' || requestingRole === 'admin') {
      return projectsRepository.listByOrganization(organizationId);
    }
    return projectsRepository.listForMember(organizationId, requestingUserId);
  },

  getById(projectId: number): Project {
    const project = projectsRepository.findById(projectId);
    if (!project)
      throw new NotFoundError('PROJECT_NOT_FOUND', 'Project not found.');
    return project;
  },

  update(
    projectId: number,
    input: {
      name?: string;
      description?: string | null;
      status?: ProjectStatus;
    }
  ): Project {
    const existing = projectsRepository.findById(projectId);
    if (!existing)
      throw new NotFoundError('PROJECT_NOT_FOUND', 'Project not found.');

    return projectsRepository.update(projectId, {
      name: input.name ?? existing.name,
      description:
        input.description !== undefined
          ? input.description
          : existing.description,
      status: input.status ?? existing.status
    });
  },

  remove(projectId: number): void {
    projectsRepository.remove(projectId);
  }
};
