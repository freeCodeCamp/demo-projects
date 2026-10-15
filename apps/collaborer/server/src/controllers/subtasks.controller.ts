import type { Request, Response } from 'express';
import { subtasksService } from '../services/subtasks.service.js';
import { NotFoundError } from '../utils/errors.js';
import {
  createSubtaskSchema,
  updateSubtaskSchema
} from '../validators/subtasks.validator.js';

function parseSubtaskId(req: Request): number {
  const subtaskId = Number(req.params.subtaskId);
  if (!Number.isInteger(subtaskId)) {
    throw new NotFoundError('SUBTASK_NOT_FOUND', 'Subtask not found.');
  }
  return subtaskId;
}

export const subtasksController = {
  create(req: Request, res: Response): void {
    const { title } = createSubtaskSchema.parse(req.body);
    res.status(201).json({ data: subtasksService.create(req.taskId!, title) });
  },

  list(req: Request, res: Response): void {
    res.json({ data: subtasksService.listForTask(req.taskId!) });
  },

  update(req: Request, res: Response): void {
    const input = updateSubtaskSchema.parse(req.body);
    const subtaskId = parseSubtaskId(req);
    res.json({ data: subtasksService.update(req.taskId!, subtaskId, input) });
  },

  remove(req: Request, res: Response): void {
    const subtaskId = parseSubtaskId(req);
    subtasksService.remove(req.taskId!, subtaskId);
    res.status(204).send();
  }
};
