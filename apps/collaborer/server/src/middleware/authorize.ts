import type { NextFunction, Request, Response } from 'express';
import type { OrganizationRole } from '../models/organization-member.model.js';
import { attachmentsRepository } from '../repositories/attachments.repository.js';
import { commentsRepository } from '../repositories/comments.repository.js';
import { labelsRepository } from '../repositories/labels.repository.js';
import { organizationMembersRepository } from '../repositories/organization-members.repository.js';
import { projectMembersRepository } from '../repositories/project-members.repository.js';
import { projectsRepository } from '../repositories/projects.repository.js';
import { tasksRepository } from '../repositories/tasks.repository.js';
import { ForbiddenError, NotFoundError } from '../utils/errors.js';

const ROLE_RANK: Record<OrganizationRole, number> = {
  member: 0,
  admin: 1,
  owner: 2
};

// Verifies the authenticated user belongs to the organization named in the URL and
// meets the minimum role, then attaches the *verified* org context to the request.
// Controllers/services must read req.organizationId/req.organizationRole, never
// re-parse req.params.organizationId directly — that's the whole point of this check.
export function requireOrganizationRole(minRole: OrganizationRole = 'member') {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const organizationId = Number(req.params.organizationId);

    if (!Number.isInteger(organizationId)) {
      throw new NotFoundError(
        'ORGANIZATION_NOT_FOUND',
        'Organization not found.'
      );
    }

    const membership = organizationMembersRepository.findMembership(
      organizationId,
      req.user!.id
    );

    if (!membership) {
      // Don't distinguish "no such org" from "org exists but you're not in it" —
      // avoids revealing which organization IDs exist to non-members.
      throw new NotFoundError(
        'ORGANIZATION_NOT_FOUND',
        'Organization not found.'
      );
    }

    if (ROLE_RANK[membership.role] < ROLE_RANK[minRole]) {
      throw new ForbiddenError();
    }

    req.organizationId = organizationId;
    req.organizationRole = membership.role;
    next();
  };
}

function resolveProjectContext(req: Request): {
  projectId: number;
  organizationId: number;
  organizationRole: OrganizationRole;
} {
  const projectId = Number(req.params.projectId);
  if (!Number.isInteger(projectId)) {
    throw new NotFoundError('PROJECT_NOT_FOUND', 'Project not found.');
  }

  const project = projectsRepository.findById(projectId);
  if (!project) {
    throw new NotFoundError('PROJECT_NOT_FOUND', 'Project not found.');
  }

  const membership = organizationMembersRepository.findMembership(
    project.organization_id,
    req.user!.id
  );
  if (!membership) {
    // Hide existence from anyone outside the project's organization entirely.
    throw new NotFoundError('PROJECT_NOT_FOUND', 'Project not found.');
  }

  return {
    projectId,
    organizationId: project.organization_id,
    organizationRole: membership.role
  };
}

// Per the PRD's role definitions: org owners/admins have implicit access to every
// project in their organization; plain members only see projects they've been
// explicitly added to.
export function requireProjectViewAccess(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const { projectId, organizationId, organizationRole } =
    resolveProjectContext(req);

  const isOrgManager =
    organizationRole === 'owner' || organizationRole === 'admin';
  if (
    !isOrgManager &&
    !projectMembersRepository.isMember(projectId, req.user!.id)
  ) {
    throw new NotFoundError('PROJECT_NOT_FOUND', 'Project not found.');
  }

  req.projectId = projectId;
  req.organizationId = organizationId;
  req.organizationRole = organizationRole;
  next();
}

// Editing/deleting a project or managing its membership is an org admin/owner
// action, regardless of whether the acting user is also an explicit project member.
export function requireProjectManageAccess(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const { projectId, organizationId, organizationRole } =
    resolveProjectContext(req);

  if (ROLE_RANK[organizationRole] < ROLE_RANK.admin) {
    throw new ForbiddenError();
  }

  req.projectId = projectId;
  req.organizationId = organizationId;
  req.organizationRole = organizationRole;
  next();
}

// Shared resolver for anything that hangs off a project (tasks, labels, and in
// later phases comments/attachments): looks up the entity by :paramName, resolves
// its parent project, and applies the same "org manager implicit / plain member
// needs explicit project membership" rule as requireProjectViewAccess. Access
// level here always matches project *view* access — the PRD doesn't restrict
// day-to-day task/label work to admins, only project settings/membership.
function resolveProjectScopedEntity<T extends { project_id: number }>(
  req: Request,
  paramName: string,
  notFoundCode: string,
  notFoundMessage: string,
  findEntity: (id: number) => T | undefined
): {
  entityId: number;
  projectId: number;
  organizationId: number;
  organizationRole: OrganizationRole;
} {
  const entityId = Number(req.params[paramName]);
  if (!Number.isInteger(entityId)) {
    throw new NotFoundError(notFoundCode, notFoundMessage);
  }

  const entity = findEntity(entityId);
  if (!entity) {
    throw new NotFoundError(notFoundCode, notFoundMessage);
  }

  const project = projectsRepository.findById(entity.project_id);
  if (!project) {
    throw new NotFoundError(notFoundCode, notFoundMessage);
  }

  const membership = organizationMembersRepository.findMembership(
    project.organization_id,
    req.user!.id
  );
  if (!membership) {
    throw new NotFoundError(notFoundCode, notFoundMessage);
  }

  const isOrgManager =
    membership.role === 'owner' || membership.role === 'admin';
  if (
    !isOrgManager &&
    !projectMembersRepository.isMember(project.id, req.user!.id)
  ) {
    throw new NotFoundError(notFoundCode, notFoundMessage);
  }

  return {
    entityId,
    projectId: project.id,
    organizationId: project.organization_id,
    organizationRole: membership.role
  };
}

export function requireTaskAccess(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const ctx = resolveProjectScopedEntity(
    req,
    'taskId',
    'TASK_NOT_FOUND',
    'Task not found.',
    tasksRepository.findById
  );
  req.taskId = ctx.entityId;
  req.projectId = ctx.projectId;
  req.organizationId = ctx.organizationId;
  req.organizationRole = ctx.organizationRole;
  next();
}

export function requireLabelAccess(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const ctx = resolveProjectScopedEntity(
    req,
    'labelId',
    'LABEL_NOT_FOUND',
    'Label not found.',
    labelsRepository.findById
  );
  req.labelId = ctx.entityId;
  req.projectId = ctx.projectId;
  req.organizationId = ctx.organizationId;
  req.organizationRole = ctx.organizationRole;
  next();
}

// Same idea as resolveProjectScopedEntity, one level further removed: for entities
// that hang off a *task* rather than directly off a project (comments here;
// attachments in a later phase) — resolves entity -> task -> project -> org.
function resolveTaskScopedEntity<T extends { task_id: number }>(
  req: Request,
  paramName: string,
  notFoundCode: string,
  notFoundMessage: string,
  findEntity: (id: number) => T | undefined
): {
  entityId: number;
  taskId: number;
  projectId: number;
  organizationId: number;
  organizationRole: OrganizationRole;
} {
  const entityId = Number(req.params[paramName]);
  if (!Number.isInteger(entityId)) {
    throw new NotFoundError(notFoundCode, notFoundMessage);
  }

  const entity = findEntity(entityId);
  if (!entity) {
    throw new NotFoundError(notFoundCode, notFoundMessage);
  }

  const task = tasksRepository.findById(entity.task_id);
  if (!task) {
    throw new NotFoundError(notFoundCode, notFoundMessage);
  }

  const project = projectsRepository.findById(task.project_id);
  if (!project) {
    throw new NotFoundError(notFoundCode, notFoundMessage);
  }

  const membership = organizationMembersRepository.findMembership(
    project.organization_id,
    req.user!.id
  );
  if (!membership) {
    throw new NotFoundError(notFoundCode, notFoundMessage);
  }

  const isOrgManager =
    membership.role === 'owner' || membership.role === 'admin';
  if (
    !isOrgManager &&
    !projectMembersRepository.isMember(project.id, req.user!.id)
  ) {
    throw new NotFoundError(notFoundCode, notFoundMessage);
  }

  return {
    entityId,
    taskId: task.id,
    projectId: project.id,
    organizationId: project.organization_id,
    organizationRole: membership.role
  };
}

// Verifies the requester can see the comment's task (i.e. its project). Whether
// they can *edit/delete* it (author-only) is a separate, narrower check made in
// comments.service.ts — this middleware only gates read/reply-level access.
export function requireCommentAccess(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const ctx = resolveTaskScopedEntity(
    req,
    'commentId',
    'COMMENT_NOT_FOUND',
    'Comment not found.',
    commentsRepository.findById
  );
  req.commentId = ctx.entityId;
  req.taskId = ctx.taskId;
  req.projectId = ctx.projectId;
  req.organizationId = ctx.organizationId;
  req.organizationRole = ctx.organizationRole;
  next();
}

// Same access tier as requireCommentAccess (project view access) — download is
// "authorized users", not uploader-only. Uploader-only delete is enforced in
// attachments.service.ts, same pattern as comment ownership.
export function requireAttachmentAccess(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const ctx = resolveTaskScopedEntity(
    req,
    'attachmentId',
    'ATTACHMENT_NOT_FOUND',
    'Attachment not found.',
    attachmentsRepository.findById
  );
  req.attachmentId = ctx.entityId;
  req.taskId = ctx.taskId;
  req.projectId = ctx.projectId;
  req.organizationId = ctx.organizationId;
  req.organizationRole = ctx.organizationRole;
  next();
}
