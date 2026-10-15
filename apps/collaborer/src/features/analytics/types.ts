import type { TaskPriority, TaskStatus } from '../tasks/types.js';

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
