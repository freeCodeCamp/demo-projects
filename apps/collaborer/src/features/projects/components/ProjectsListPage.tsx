import { useCallback, useEffect, useState } from 'react';
import { Alert } from '../../../components/alert.js';
import { Button } from '../../../components/button.js';
import { useSession } from '../../../lib/auth/session.js';
import { formatEnumLabel } from '../../../lib/utils/format.js';
import {
  useMyOrganizationRole,
  useOrganizations
} from '../../organizations/hooks.js';
import { projectsApi } from '../api.js';
import type { Project } from '../types.js';
import { CreateProjectModal } from './CreateProjectModal.js';

export function ProjectsListPage() {
  const session = useSession();
  const orgState = useOrganizations();
  const currentOrgId = orgState.status === 'ready' ? orgState.current.id : null;
  const myRole = useMyOrganizationRole(currentOrgId);
  const canCreate = myRole === 'owner' || myRole === 'admin';

  const [projects, setProjects] = useState<Project[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  const load = useCallback((organizationId: number) => {
    setLoadError(null);
    projectsApi
      .listForOrganization(organizationId)
      .then(setProjects)
      .catch(err =>
        setLoadError(
          err instanceof Error ? err.message : 'Failed to load projects.'
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
        Create an organization first to add projects.
      </p>
    );
  }

  return (
    <div>
      <Alert variant='error'>{loadError}</Alert>

      {canCreate && (
        <div className='page-actions'>
          <Button variant='primary' onClick={() => setCreateOpen(true)}>
            New project
          </Button>
        </div>
      )}

      {!projects ? (
        <p className='loading-state' role='status'>
          Loading projects…
        </p>
      ) : projects.length === 0 ? (
        <p className='empty-state'>No projects yet.</p>
      ) : (
        <div className='widget-grid'>
          {projects.map(project => (
            <a
              key={project.id}
              className='card project-card'
              href={`/projects/${project.id}`}
            >
              <div className='project-card-header'>
                <h2>{project.name}</h2>
                <span className='badge badge-neutral'>
                  {formatEnumLabel(project.status)}
                </span>
              </div>
              <p>{project.description || 'No description.'}</p>
            </a>
          ))}
        </div>
      )}

      <CreateProjectModal
        open={createOpen}
        organizationId={currentOrgId!}
        onClose={() => setCreateOpen(false)}
        onCreated={projectId => {
          window.location.href = `/projects/${projectId}`;
        }}
      />
    </div>
  );
}
