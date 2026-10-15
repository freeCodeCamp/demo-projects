import type { Request, Response } from 'express';
import { organizationsService } from '../services/organizations.service.js';
import {
  createOrganizationSchema,
  updateOrganizationSchema
} from '../validators/organizations.validator.js';

export const organizationsController = {
  create(req: Request, res: Response): void {
    const input = createOrganizationSchema.parse(req.body);
    const organization = organizationsService.create(req.user!.id, input);
    res.status(201).json({ data: organization });
  },

  listMine(req: Request, res: Response): void {
    res.json({ data: organizationsService.listForUser(req.user!.id) });
  },

  getById(req: Request, res: Response): void {
    res.json({ data: organizationsService.getById(req.organizationId!) });
  },

  update(req: Request, res: Response): void {
    const input = updateOrganizationSchema.parse(req.body);
    res.json({ data: organizationsService.update(req.organizationId!, input) });
  },

  remove(req: Request, res: Response): void {
    organizationsService.remove(req.organizationId!);
    res.status(204).send();
  }
};
