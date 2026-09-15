import type { Request } from 'express';

const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 100;

export interface PaginationParams {
  page: number;
  limit: number;
  offset: number;
}

export function getPaginationParams(req: Request): PaginationParams {
  const page = Math.max(
    1,
    Number.parseInt(String(req.query.page ?? '1'), 10) || 1
  );
  const limit = Math.min(
    MAX_LIMIT,
    Math.max(
      1,
      Number.parseInt(String(req.query.limit ?? String(DEFAULT_LIMIT)), 10) ||
        DEFAULT_LIMIT
    )
  );

  return { page, limit, offset: (page - 1) * limit };
}

export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function buildPaginatedResult<T>(
  data: T[],
  total: number,
  params: PaginationParams
): PaginatedResult<T> {
  return {
    data,
    pagination: {
      page: params.page,
      limit: params.limit,
      total,
      totalPages: Math.ceil(total / params.limit)
    }
  };
}
