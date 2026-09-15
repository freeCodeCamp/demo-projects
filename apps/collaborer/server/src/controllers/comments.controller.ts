import type { Request, Response } from 'express';
import { commentsService } from '../services/comments.service.js';
import { getPaginationParams } from '../utils/pagination.js';
import {
  createCommentSchema,
  updateCommentSchema
} from '../validators/comments.validator.js';

export const commentsController = {
  create(req: Request, res: Response): void {
    const { body } = createCommentSchema.parse(req.body);
    const comment = commentsService.create(
      req.taskId!,
      req.projectId!,
      req.organizationId!,
      req.user!.id,
      body
    );
    res.status(201).json({ data: comment });
  },

  list(req: Request, res: Response): void {
    const pagination = getPaginationParams(req);
    res.json(commentsService.listForTask(req.taskId!, pagination));
  },

  update(req: Request, res: Response): void {
    const { body } = updateCommentSchema.parse(req.body);
    res.json({
      data: commentsService.update(req.commentId!, req.user!.id, body)
    });
  },

  remove(req: Request, res: Response): void {
    commentsService.remove(req.commentId!, req.user!.id);
    res.status(204).send();
  }
};
