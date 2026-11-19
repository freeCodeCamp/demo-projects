import type { Request, Response } from 'express';
import { projectMembersService } from '../services/project-members.service.js';
import { NotFoundError } from '../utils/errors.js';
import { addProjectMemberSchema } from '../validators/project-members.validator.js';

function parseTargetUserId(req: Request): number {
  const targetUserId = Number(req.params.userId);
  if (!Number.isInteger(targetUserId)) {
    throw new NotFoundError(
      'MEMBER_NOT_FOUND',
      'This user is not a member of the project.'
    );
  }
  return targetUserId;
}

export const projectMembersController = {
  list(req: Request, res: Response): void {
    res.json({ data: projectMembersService.list(req.projectId!) });
  },

  add(req: Request, res: Response): void {
    const { userId } = addProjectMemberSchema.parse(req.body);
    projectMembersService.add(req.projectId!, req.user!.id, userId);
    res.status(204).send();
  },

  remove(req: Request, res: Response): void {
    const targetUserId = parseTargetUserId(req);
    projectMembersService.remove(req.projectId!, req.user!.id, targetUserId);
    res.status(204).send();
  }
};
