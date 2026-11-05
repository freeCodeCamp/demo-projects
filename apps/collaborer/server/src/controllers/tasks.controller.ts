import type { Request, Response } from 'express';
import { tasksService } from '../services/tasks.service.js';
import { getPaginationParams } from '../utils/pagination.js';
import { attachLabelSchema } from '../validators/labels.validator.js';
import {
  createTaskSchema,
  taskQuerySchema,
  updateTaskSchema
} from '../validators/tasks.validator.js';

export const tasksController = {
  create(req: Request, res: Response): void {
    const input = createTaskSchema.parse(req.body);
    const task = tasksService.create(
      req.projectId!,
      req.organizationId!,
      req.user!.id,
      input
    );
    res.status(201).json({ data: task });
  },

  list(req: Request, res: Response): void {
    const query = taskQuerySchema.parse(req.query);
    const pagination = getPaginationParams(req);
    const result = tasksService.list(
      req.projectId!,
      {
        status: query.status,
        priority: query.priority,
        assigneeId: query.assigneeId,
        labelId: query.labelId,
        dueBefore: query.dueBefore,
        dueAfter: query.dueAfter
      },
      { field: query.sortBy, order: query.sortOrder },
      pagination
    );
    res.json(result);
  },

  getById(req: Request, res: Response): void {
    res.json({ data: tasksService.getById(req.taskId!) });
  },

  update(req: Request, res: Response): void {
    const input = updateTaskSchema.parse(req.body);
    res.json({
      data: tasksService.update(
        req.taskId!,
        req.projectId!,
        req.organizationId!,
        req.user!.id,
        input
      )
    });
  },

  async remove(req: Request, res: Response): Promise<void> {
    await tasksService.remove(req.taskId!);
    res.status(204).send();
  },

  attachLabel(req: Request, res: Response): void {
    const { labelId } = attachLabelSchema.parse(req.body);
    tasksService.attachLabel(req.taskId!, req.projectId!, labelId);
    res.status(204).send();
  },

  detachLabel(req: Request, res: Response): void {
    const labelId = Number(req.params.labelId);
    tasksService.detachLabel(req.taskId!, labelId);
    res.status(204).send();
  }
};
