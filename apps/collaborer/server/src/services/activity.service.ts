import { activityRepository } from '../repositories/activity.repository.js';
import {
  buildPaginatedResult,
  type PaginationParams
} from '../utils/pagination.js';

export const activityService = {
  // Called by other services as a side effect of the action being recorded —
  // never exposed as its own write endpoint. Kept as one flat table/call shape
  // (actor/action/entity/metadata) rather than a generic event-sourcing framework.
  record(input: {
    organizationId: number;
    projectId: number | null;
    actorId: number;
    action: string;
    entityType: string;
    entityId: number;
    metadata?: Record<string, unknown>;
  }): void {
    activityRepository.create({
      organizationId: input.organizationId,
      projectId: input.projectId,
      actorId: input.actorId,
      action: input.action,
      entityType: input.entityType,
      entityId: input.entityId,
      metadata: input.metadata ?? {}
    });
  },

  listForProject(projectId: number, pagination: PaginationParams) {
    const activities = activityRepository.listByProject(
      projectId,
      pagination.limit,
      pagination.offset
    );
    const total = activityRepository.countByProject(projectId);
    return buildPaginatedResult(activities, total, pagination);
  }
};
