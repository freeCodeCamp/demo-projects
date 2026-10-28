import type { Request, Response } from 'express';
import { projectsService } from '../services/projects.service.js';
import {
  createProjectSchema,
  updateProjectSchema
} from '../validators/projects.validator.js';

export const projectsController = {
  create(req: Request, res: Response): void {
    const input = createProjectSchema.parse(req.body);
    const project = projectsService.create(
      req.organizationId!,
      req.user!.id,
      input
    );
    res.status(201).json({ data: project });
  },

  listForOrganization(req: Request, res: Response): void {
    const projects = projectsService.listForOrganization(
      req.organizationId!,
      req.user!.id,
      req.organizationRole!
    );
    res.json({ data: projects });
  },

  getById(req: Request, res: Response): void {
    res.json({ data: projectsService.getById(req.projectId!) });
  },

  update(req: Request, res: Response): void {
    const input = updateProjectSchema.parse(req.body);
    res.json({ data: projectsService.update(req.projectId!, input) });
  },

  remove(req: Request, res: Response): void {
    projectsService.remove(req.projectId!);
    res.status(204).send();
  }
};
