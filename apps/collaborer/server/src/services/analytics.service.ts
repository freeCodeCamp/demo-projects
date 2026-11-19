import type { OrganizationRole } from '../models/organization-member.model.js';
import type { TaskPriority, TaskStatus } from '../models/task.model.js';
import { analyticsRepository } from '../repositories/analytics.repository.js';

export interface WeeklyCount {
  weekStart: string;
  count: number;
}

export interface AnalyticsResults {
  tasksByStatus: Record<TaskStatus, number>;
  tasksByPriority: Record<TaskPriority, number>;
  completionsOverTime: WeeklyCount[];
  activityOverTime: WeeklyCount[];
  overdueVsOnTrack: { overdue: number; onTrack: number };
  subtaskCompletionRate: { completed: number; remaining: number };
}

const ALL_STATUSES: TaskStatus[] = [
  'backlog',
  'todo',
  'in_progress',
  'in_review',
  'done'
];
const ALL_PRIORITIES: TaskPriority[] = ['low', 'medium', 'high', 'urgent'];

const WEEKS_OF_HISTORY = 8;
const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

// Buckets timestamps into 8 rolling 7-day periods ending now (not calendar
// weeks — a fixed period length avoids any timezone/week-start-day
// ambiguity). Exported for a focused unit test on the date math itself.
export function bucketByWeek(
  timestamps: string[],
  now: number = Date.now()
): WeeklyCount[] {
  const buckets = Array.from({ length: WEEKS_OF_HISTORY }, (_, i) => {
    const periodsAgo = WEEKS_OF_HISTORY - 1 - i;
    const weekStart = new Date(now - (periodsAgo + 1) * WEEK_MS);
    return { weekStart: weekStart.toISOString().slice(0, 10), count: 0 };
  });

  for (const timestamp of timestamps) {
    const age = now - new Date(timestamp).getTime();
    const periodsAgo = Math.floor(age / WEEK_MS);
    const index = WEEKS_OF_HISTORY - 1 - periodsAgo;
    if (index >= 0 && index < buckets.length) buckets[index]!.count += 1;
  }

  return buckets;
}

export const analyticsService = {
  getAnalytics(
    organizationId: number,
    userId: number,
    role: OrganizationRole
  ): AnalyticsResults {
    const isOrgManager = role === 'owner' || role === 'admin';
    const now = Date.now();
    const since = new Date(now - WEEKS_OF_HISTORY * WEEK_MS).toISOString();

    const tasksByStatus = Object.fromEntries(
      ALL_STATUSES.map(status => [status, 0])
    ) as Record<TaskStatus, number>;
    for (const row of analyticsRepository.taskStatusCounts(
      organizationId,
      userId,
      isOrgManager
    )) {
      tasksByStatus[row.status] = row.count;
    }

    const tasksByPriority = Object.fromEntries(
      ALL_PRIORITIES.map(priority => [priority, 0])
    ) as Record<TaskPriority, number>;
    for (const row of analyticsRepository.taskPriorityCounts(
      organizationId,
      userId,
      isOrgManager
    )) {
      tasksByPriority[row.priority] = row.count;
    }

    const completionsOverTime = bucketByWeek(
      analyticsRepository.completionTimestamps(
        organizationId,
        userId,
        since,
        isOrgManager
      ),
      now
    );
    const activityOverTime = bucketByWeek(
      analyticsRepository.activityTimestamps(
        organizationId,
        userId,
        since,
        isOrgManager
      ),
      now
    );

    const overdue = analyticsRepository.overdueSplit(
      organizationId,
      userId,
      new Date(now).toISOString(),
      isOrgManager
    );
    const overdueVsOnTrack = {
      overdue: overdue.matched ?? 0,
      onTrack: overdue.total - (overdue.matched ?? 0)
    };

    const subtasks = analyticsRepository.subtaskCompletionSplit(
      organizationId,
      userId,
      isOrgManager
    );
    const subtaskCompletionRate = {
      completed: subtasks.matched ?? 0,
      remaining: subtasks.total - (subtasks.matched ?? 0)
    };

    return {
      tasksByStatus,
      tasksByPriority,
      completionsOverTime,
      activityOverTime,
      overdueVsOnTrack,
      subtaskCompletionRate
    };
  }
};
