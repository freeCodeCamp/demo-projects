import { useCallback, useEffect, useState } from 'react';
import { formatEnumLabel } from '../../../lib/utils/format.js';
import { useSession } from '../../../lib/auth/session.js';
import { useOrganizations } from '../../organizations/hooks.js';
import type { TaskPriority, TaskStatus } from '../../tasks/types.js';
import { analyticsApi } from '../api.js';
import type { AnalyticsResults } from '../types.js';
import { BarChart } from './BarChart.js';
import { LineChart } from './LineChart.js';
import { PieChart } from './PieChart.js';

// Matches the Kanban board's column order (KanbanBoard.tsx's COLUMNS) so the
// two views of "task status" agree with each other.
const STATUS_ORDER: TaskStatus[] = [
  'backlog',
  'todo',
  'in_progress',
  'in_review',
  'done'
];
const PRIORITY_ORDER: TaskPriority[] = ['low', 'medium', 'high', 'urgent'];

export function AnalyticsPage() {
  const session = useSession();
  const orgState = useOrganizations();
  const currentOrgId = orgState.status === 'ready' ? orgState.current.id : null;

  const [results, setResults] = useState<AnalyticsResults | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const load = useCallback((organizationId: number) => {
    setLoadError(null);
    analyticsApi
      .getAnalytics(organizationId)
      .then(setResults)
      .catch(err =>
        setLoadError(
          err instanceof Error ? err.message : 'Failed to load analytics.'
        )
      );
  }, []);

  useEffect(() => {
    if (currentOrgId !== null) load(currentOrgId);
  }, [currentOrgId, load]);

  if (session.status === 'loading' || orgState.status === 'loading') {
    return (
      <p className='loading-state' role='status'>
        Loading…
      </p>
    );
  }
  if (session.status === 'unauthenticated') {
    if (typeof window !== 'undefined') {
      window.location.href = `/login?redirect=${encodeURIComponent(
        window.location.pathname
      )}`;
    }
    return <></>;
  }
  if (orgState.status === 'error') {
    return (
      <p className='error-state' role='alert'>
        {orgState.message}
      </p>
    );
  }
  if (orgState.status === 'empty') {
    return (
      <p className='empty-state'>
        Create an organization first to see analytics.
      </p>
    );
  }
  if (loadError) {
    return (
      <p className='error-state' role='alert'>
        {loadError}
      </p>
    );
  }
  if (!results) {
    return (
      <p className='loading-state' role='status'>
        Loading…
      </p>
    );
  }

  const tasksByStatusTotal = Object.values(results.tasksByStatus).reduce(
    (sum, count) => sum + count,
    0
  );
  const tasksByPriorityTotal = Object.values(results.tasksByPriority).reduce(
    (sum, count) => sum + count,
    0
  );
  const completionsTotal = results.completionsOverTime.reduce(
    (sum, bucket) => sum + bucket.count,
    0
  );
  const activityTotal = results.activityOverTime.reduce(
    (sum, bucket) => sum + bucket.count,
    0
  );
  const overdueTotal =
    results.overdueVsOnTrack.overdue + results.overdueVsOnTrack.onTrack;
  const subtaskTotal =
    results.subtaskCompletionRate.completed +
    results.subtaskCompletionRate.remaining;

  return (
    <div>
      <section className='page-section'>
        <h2>Tasks by status</h2>
        {tasksByStatusTotal === 0 ? (
          <p className='empty-state'>No tasks yet.</p>
        ) : (
          <BarChart
            data={STATUS_ORDER.map(status => ({
              label: formatEnumLabel(status),
              value: results.tasksByStatus[status]
            }))}
            ariaLabel='Tasks by status'
          />
        )}
      </section>

      <section className='page-section'>
        <h2>Tasks by priority</h2>
        {tasksByPriorityTotal === 0 ? (
          <p className='empty-state'>No tasks yet.</p>
        ) : (
          <BarChart
            data={PRIORITY_ORDER.map(priority => ({
              label: formatEnumLabel(priority),
              value: results.tasksByPriority[priority]
            }))}
            ariaLabel='Tasks by priority'
          />
        )}
      </section>

      <section className='page-section'>
        <h2>Completions over time</h2>
        {completionsTotal === 0 ? (
          <p className='empty-state'>No tasks completed in the last 8 weeks.</p>
        ) : (
          <LineChart
            data={results.completionsOverTime.map(bucket => ({
              label: bucket.weekStart,
              value: bucket.count
            }))}
            ariaLabel='Task completions over the last 8 weeks'
          />
        )}
      </section>

      <section className='page-section'>
        <h2>Activity over time</h2>
        {activityTotal === 0 ? (
          <p className='empty-state'>No activity in the last 8 weeks.</p>
        ) : (
          <LineChart
            data={results.activityOverTime.map(bucket => ({
              label: bucket.weekStart,
              value: bucket.count
            }))}
            ariaLabel='Team activity over the last 8 weeks'
          />
        )}
      </section>

      <section className='page-section'>
        <h2>Overdue vs on track</h2>
        {overdueTotal === 0 ? (
          <p className='empty-state'>No tasks yet.</p>
        ) : (
          <PieChart
            data={[
              {
                label: 'Overdue',
                value: results.overdueVsOnTrack.overdue,
                color: 'var(--danger-color)'
              },
              {
                label: 'On track',
                value: results.overdueVsOnTrack.onTrack,
                color: 'var(--success-color)'
              }
            ]}
            ariaLabel='Overdue vs on-track tasks'
          />
        )}
      </section>

      <section className='page-section'>
        <h2>Subtask completion rate</h2>
        {subtaskTotal === 0 ? (
          <p className='empty-state'>No subtasks yet.</p>
        ) : (
          <PieChart
            hollow
            data={[
              {
                label: 'Completed',
                value: results.subtaskCompletionRate.completed,
                color: 'var(--success-color)'
              },
              {
                label: 'Remaining',
                value: results.subtaskCompletionRate.remaining,
                color: 'var(--quaternary-color)'
              }
            ]}
            ariaLabel='Subtask completion rate'
          />
        )}
      </section>
    </div>
  );
}
