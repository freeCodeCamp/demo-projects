import { db } from '../db/index.js';
import type { ProjectMemberWithUser } from '../models/project-member.model.js';
import { organizationMembersRepository } from '../repositories/organization-members.repository.js';
import { projectMembersRepository } from '../repositories/project-members.repository.js';
import { projectsRepository } from '../repositories/projects.repository.js';
import {
  BadRequestError,
  ConflictError,
  NotFoundError
} from '../utils/errors.js';
import { activityService } from './activity.service.js';
import { notificationsService } from './notifications.service.js';

export const projectMembersService = {
  list(projectId: number): ProjectMemberWithUser[] {
    return projectMembersRepository.list(projectId);
  },

  add(projectId: number, actorId: number, userId: number): void {
    const project = projectsRepository.findById(projectId);
    if (!project)
      throw new NotFoundError('PROJECT_NOT_FOUND', 'Project not found.');

    const isOrganizationMember = organizationMembersRepository.findMembership(
      project.organization_id,
      userId
    );
    if (!isOrganizationMember) {
      throw new BadRequestError(
        'NOT_ORGANIZATION_MEMBER',
        'This user must be a member of the organization before being added to a project.'
      );
    }

    if (projectMembersRepository.isMember(projectId, userId)) {
      throw new ConflictError(
        'ALREADY_PROJECT_MEMBER',
        'This user is already a member of the project.'
      );
    }

    db.transaction(() => {
      projectMembersRepository.add(projectId, userId);

      activityService.record({
        organizationId: project.organization_id,
        projectId,
        actorId,
        action: 'project_member.added',
        entityType: 'project',
        entityId: projectId,
        metadata: { userId }
      });

      if (userId !== actorId) {
        notificationsService.notify(userId, 'added_to_project', {
          projectId,
          projectName: project.name
        });
      }
    })();
  },

  remove(projectId: number, actorId: number, userId: number): void {
    projectMembersRepository.remove(projectId, userId);

    if (userId !== actorId) {
      const project = projectsRepository.findById(projectId);
      notificationsService.notify(userId, 'removed_from_project', {
        projectId,
        projectName: project?.name ?? 'a project'
      });
    }
  }
};
