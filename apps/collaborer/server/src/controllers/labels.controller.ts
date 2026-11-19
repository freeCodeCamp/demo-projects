import type { Request, Response } from 'express';
import { labelsService } from '../services/labels.service.js';
import {
  createLabelSchema,
  updateLabelSchema
} from '../validators/labels.validator.js';

export const labelsController = {
  create(req: Request, res: Response): void {
    const input = createLabelSchema.parse(req.body);
    res.status(201).json({ data: labelsService.create(req.projectId!, input) });
  },

  listForProject(req: Request, res: Response): void {
    res.json({ data: labelsService.listForProject(req.projectId!) });
  },

  update(req: Request, res: Response): void {
    const input = updateLabelSchema.parse(req.body);
    res.json({ data: labelsService.update(req.labelId!, input) });
  },

  remove(req: Request, res: Response): void {
    labelsService.remove(req.labelId!);
    res.status(204).send();
  }
};
