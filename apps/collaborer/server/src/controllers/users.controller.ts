import type { Request, Response } from 'express';
import { tasksService } from '../services/tasks.service.js';
import { usersService } from '../services/users.service.js';
import { NotFoundError } from '../utils/errors.js';
import { updateProfileSchema } from '../validators/users.validator.js';

export const usersController = {
  getMe(req: Request, res: Response): void {
    const user = usersService.getProfile(req.user!.id);
    if (!user) throw new NotFoundError('USER_NOT_FOUND', 'User not found.');
    res.json({ data: user });
  },

  updateMe(req: Request, res: Response): void {
    const input = updateProfileSchema.parse(req.body);
    const user = usersService.updateProfile(req.user!.id, input);
    res.json({ data: user });
  },

  getMyTasks(req: Request, res: Response): void {
    res.json({ data: tasksService.listAssignedToUser(req.user!.id) });
  }
};
