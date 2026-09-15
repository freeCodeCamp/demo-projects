import type { Request, Response } from 'express';
import { organizationMembersService } from '../services/organization-members.service.js';
import { NotFoundError } from '../utils/errors.js';
import { getPaginationParams } from '../utils/pagination.js';
import { changeRoleSchema } from '../validators/organization-members.validator.js';

function parseTargetUserId(req: Request): number {
  const targetUserId = Number(req.params.userId);
  if (!Number.isInteger(targetUserId)) {
    throw new NotFoundError(
      'MEMBER_NOT_FOUND',
      'This user is not a member of the organization.'
    );
  }
  return targetUserId;
}

export const organizationMembersController = {
  list(req: Request, res: Response): void {
    const pagination = getPaginationParams(req);
    res.json(organizationMembersService.list(req.organizationId!, pagination));
  },

  changeRole(req: Request, res: Response): void {
    const { role } = changeRoleSchema.parse(req.body);
    const targetUserId = parseTargetUserId(req);
    organizationMembersService.changeRole(
      req.organizationId!,
      req.user!.id,
      req.organizationRole!,
      targetUserId,
      role
    );
    res.status(204).send();
  },

  remove(req: Request, res: Response): void {
    const targetUserId = parseTargetUserId(req);
    organizationMembersService.remove(
      req.organizationId!,
      req.user!.id,
      targetUserId
    );
    res.status(204).send();
  }
};
