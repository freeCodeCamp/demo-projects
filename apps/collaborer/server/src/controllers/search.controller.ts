import type { Request, Response } from 'express';
import { searchService } from '../services/search.service.js';
import { searchQuerySchema } from '../validators/search.validator.js';

export const searchController = {
  search(req: Request, res: Response): void {
    const { q, type } = searchQuerySchema.parse(req.query);
    const results = searchService.search(
      req.organizationId!,
      req.user!.id,
      req.organizationRole!,
      q,
      type
    );
    res.json({ data: results });
  }
};
