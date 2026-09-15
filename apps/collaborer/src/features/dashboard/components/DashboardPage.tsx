import { useEffect, useState } from 'react';
import { useSession } from '../../../lib/auth/session.js';
import {
  formatDate,
  formatRelativeTime,
  isOverdue
} from '../../../lib/utils/format.js';
import { notificationsApi } from '../../notifications/api.js';
import { describeNotification } from '../../notifications/describe.js';
import type { Notification } from '../../notifications/types.js';
import { CreateOrganizationForm } from '../../organizations/components/CreateOrganizationForm.js';
import { useOrganizations } from '../../organizations/hooks.js';
import { projectsApi } from '../../projects/api.js';
import type { Activity, Project } from '../../projects/types.js';
import { tasksApi } from '../../tasks/api.js';
import type { TaskAssignedToMe } from '../../tasks/types.js';

function bucketTasks(tasks: TaskAssignedToMe[]) {
  const now = Date.now();
  const soonThreshold = now + 7 * 24 * 60 * 60 * 1000;
  const overdue: TaskAssignedToMe[] = [];
  const dueSoon: TaskAssignedToMe[] = [];

  for (const task of tasks) {
    if (task.status === 'done' || !task.due_date) continue;
    const dueTime = new Date(task.due_date).getTime();
    if (dueTime < now) overdue.push(task);
    else if (dueTime <= soonThreshold) dueSoon.push(task);
  }

  return { overdue, dueSoon };
}

function describeActivity(activity: Activity): string {
  const meta = activity.metadata;
  const title =
    typeof meta.title === 'string'
      ? meta.title
      : typeof meta.taskTitle === 'string'
      ? meta.taskTitle
      : 'an item';
  const actor = activity.actor_name;

  switch (activity.action) {
    case 'task.created':
      return `${actor} created "${title}"`;
    case 'task.status_changed':
      return `${actor} moved "${title}" to ${String(meta.to)}`;
    case 'task.priority_changed':
      return `${actor} changed priority of "${title}" to ${String(meta.to)}`;
    case 'task.assigned':
      return `${actor} reassigned "${title}"`;
    case 'comment.created':
      return `${actor} commented on "${title}"`;
    case 'project_member.added':
      return `${actor} added a project member`;
    case 'attachment.uploaded':
      return `${actor} attached a file to "${title}"`;
    default:
      return `${actor} ${activity.action}`;
  }
}

export function DashboardPage() {
  const session = useSession();
  const orgState = useOrganizations();

  const [myTasks, setMyTasks] = useState<TaskAssignedToMe[] | null>(null);
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [activity, setActivity] = useState<Activity[] | null>(null);
  const [notifications, setNotifications] = useState<Notification[] | null>(
    null
  );
  const [loadError, setLoadError] = useState<string | null>(null);

  const currentOrgId = orgState.status === 'ready' ? orgState.current.id : null;

  useEffect(() => {
    if (currentOrgId === null) return;
    let cancelled = false;

    tasksApi
      .listAssignedToMe()
      .then(tasks => {
        if (!cancelled) setMyTasks(tasks);
      })
      .catch(err => {
        if (!cancelled)
          setLoadError(
            err instanceof Error ? err.message : 'Failed to load tasks.'
          );
      });

    projectsApi
      .listForOrganization(currentOrgId)
      .then(async projectList => {
        if (cancelled) return;
        setProjects(projectList);

        const activityLists = await Promise.all(
          projectList.map(project =>
            projectsApi
              .listActivity(project.id)
              .then(result => result.data)
              .catch(() => [])
          )
        );
        if (cancelled) return;

        const merged = activityLists
          .flat()
          .sort((a, b) => (a.created_at < b.created_at ? 1 : -1))
          .slice(0, 10);
        setActivity(merged);
      })
      .catch(err => {
        if (!cancelled)
          setLoadError(
            err instanceof Error ? err.message : 'Failed to load projects.'
          );
      });

    notificationsApi
      .list(1)
      .then(result => {
        if (!cancelled) setNotifications(result.data);
      })
      .catch(() => {
        if (!cancelled) setNotifications([]);
      });

    return () => {
      cancelled = true;
    };
  }, [currentOrgId]);

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
      <div>
        <p>
          Welcome, {session.user.name}. Create your first organization to get
          started.
        </p>
        <CreateOrganizationForm onCreated={orgState.refresh} />
      </div>
    );
  }
  if (loadError) {
    return (
      <p className='error-state' role='alert'>
        {loadError}
      </p>
    );
  }

  const taskBuckets = myTasks ? bucketTasks(myTasks) : null;
  const urgentTasks = taskBuckets
    ? [...taskBuckets.overdue, ...taskBuckets.dueSoon].slice(0, 6)
    : [];
  const activeProjects =
    projects?.filter(project => project.status === 'active').length ?? 0;
  const completedProjects =
    projects?.filter(project => project.status === 'completed').length ?? 0;
  const unreadNotifications =
    notifications?.filter(notification => !notification.is_read).length ?? 0;

  return (
    <div>
      <p>Welcome back, {session.user.name}.</p>

      <div className='widget-grid'>
        <div className='card'>
          <h2>My tasks</h2>
          {!taskBuckets ? (
            <p className='loading-state' role='status'>
              Loading…
            </p>
          ) : (
            <>
              <div className='stat-row'>
                <span>Overdue</span>
                <span className='stat-row-value'>
                  {taskBuckets.overdue.length}
                </span>
              </div>
              <div className='stat-row'>
                <span>Due soon</span>
                <span className='stat-row-value'>
                  {taskBuckets.dueSoon.length}
                </span>
              </div>
              {urgentTasks.length === 0 ? (
                <p className='empty-state'>
                  Nothing overdue or due soon — nice work.
                </p>
              ) : (
                urgentTasks.map(task => (
                  <div className='list-item' key={task.id}>
                    <a className='list-item-title' href={`/tasks/${task.id}`}>
                      {task.title}
                    </a>
                    <div className='list-item-meta'>
                      <span>{task.project_name}</span>
                      {task.due_date && (
                        <span
                          className={`badge ${
                            isOverdue(task.due_date)
                              ? 'badge-danger'
                              : 'badge-warning'
                          }`}
                        >
                          Due {formatDate(task.due_date)}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>

        <div className='card'>
          <h2>Project overview</h2>
          {!projects ? (
            <p className='loading-state' role='status'>
              Loading…
            </p>
          ) : (
            <>
              <div className='stat-row'>
                <span>Active projects</span>
                <span className='stat-row-value'>{activeProjects}</span>
              </div>
              <div className='stat-row'>
                <span>Completed projects</span>
                <span className='stat-row-value'>{completedProjects}</span>
              </div>
              <div className='stat-row'>
                <span>Total projects</span>
                <span className='stat-row-value'>{projects.length}</span>
              </div>
              <a className='list-item-title' href='/projects'>
                View all projects →
              </a>
            </>
          )}
        </div>

        <div className='card'>
          <h2>Recent activity</h2>
          {!activity ? (
            <p className='loading-state' role='status'>
              Loading…
            </p>
          ) : activity.length === 0 ? (
            <p className='empty-state'>No activity yet.</p>
          ) : (
            activity.map(item => (
              <div className='list-item' key={item.id}>
                <span>{describeActivity(item)}</span>
                <span className='list-item-meta'>
                  {formatRelativeTime(item.created_at)}
                </span>
              </div>
            ))
          )}
        </div>

        <div className='card'>
          <h2>
            Notifications{' '}
            {unreadNotifications > 0 && (
              <span className='badge badge-neutral'>
                {unreadNotifications} new
              </span>
            )}
          </h2>
          {!notifications ? (
            <p className='loading-state' role='status'>
              Loading…
            </p>
          ) : notifications.length === 0 ? (
            <p className='empty-state'>No notifications yet.</p>
          ) : (
            notifications.slice(0, 5).map(notification => (
              <div className='list-item' key={notification.id}>
                <span>{describeNotification(notification)}</span>
                <span className='list-item-meta'>
                  {formatRelativeTime(notification.created_at)}
                </span>
              </div>
            ))
          )}
          <a className='list-item-title' href='/notifications'>
            View all →
          </a>
        </div>
      </div>
    </div>
  );
}
