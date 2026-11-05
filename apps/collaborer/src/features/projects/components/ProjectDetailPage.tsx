import { useCallback, useEffect, useState, type SubmitEvent } from 'react';
import { Alert } from '../../../components/alert.js';
import { Button } from '../../../components/button.js';
import { ConfirmDialog } from '../../../components/confirm-dialog.js';
import { TextField } from '../../../components/text-field.js';
import { useSession } from '../../../lib/auth/session.js';
import { formatEnumLabel } from '../../../lib/utils/format.js';
import type { OrganizationMember } from '../../organizations/types.js';
import { organizationsApi } from '../../organizations/api.js';
import { useMyOrganizationRole } from '../../organizations/hooks.js';
import { projectsApi } from '../api.js';
import type { Project, ProjectMember, ProjectStatus } from '../types.js';

const STATUS_OPTIONS: ProjectStatus[] = [
  'planning',
  'active',
  'on_hold',
  'completed',
  'archived'
];

type ProjectDetailPageProps = {
  projectId: number;
};

export function ProjectDetailPage({ projectId }: ProjectDetailPageProps) {
  const session = useSession();

  const [project, setProject] = useState<Project | null>(null);
  const [members, setMembers] = useState<ProjectMember[] | null>(null);
  const [orgMembers, setOrgMembers] = useState<OrganizationMember[] | null>(
    null
  );
  const [loadError, setLoadError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [addMemberId, setAddMemberId] = useState('');
  const [removeTarget, setRemoveTarget] = useState<ProjectMember | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const myRole = useMyOrganizationRole(project?.organization_id ?? null);
  const canManage = myRole === 'owner' || myRole === 'admin';

  const load = useCallback(() => {
    setLoadError(null);
    projectsApi
      .getById(projectId)
      .then(loaded => {
        setProject(loaded);
        setName(loaded.name);
        setDescription(loaded.description ?? '');
      })
      .catch(err =>
        setLoadError(
          err instanceof Error ? err.message : 'Failed to load project.'
        )
      );

    projectsApi
      .listMembers(projectId)
      .then(setMembers)
      .catch(() => setMembers([]));
  }, [projectId]);

  useEffect(load, [load]);

  // Only fetched once we know which org manages this project, and only needed
  // by admins/owners (to pick who to add) — a plain member never sees this.
  useEffect(() => {
    if (!canManage || !project) return;
    organizationsApi
      .listMembers(project.organization_id)
      .then(result => setOrgMembers(result.data))
      .catch(() => setOrgMembers([]));
  }, [canManage, project]);

  if (session.status === 'loading' || (!project && !loadError)) {
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
  if (loadError) {
    return (
      <p className='error-state' role='alert'>
        {loadError}
      </p>
    );
  }
  if (!project) return <></>;

  async function handleSave(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;

    setSaving(true);
    setActionError(null);
    setSaveSuccess(false);

    try {
      const updated = await projectsApi.update(projectId, {
        name,
        description
      });
      setProject(updated);
      setSaveSuccess(true);
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : 'Failed to save changes.'
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleStatusChange(status: ProjectStatus) {
    setActionError(null);
    try {
      const updated = await projectsApi.update(projectId, { status });
      setProject(updated);
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : 'Failed to change status.'
      );
    }
  }

  async function handleAddMember() {
    if (!addMemberId) return;
    setActionError(null);
    try {
      await projectsApi.addMember(projectId, Number(addMemberId));
      setAddMemberId('');
      load();
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : 'Failed to add member.'
      );
    }
  }

  async function handleRemoveMember() {
    if (!removeTarget) return;
    setActionError(null);
    try {
      await projectsApi.removeMember(projectId, removeTarget.user_id);
      setRemoveTarget(null);
      load();
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : 'Failed to remove member.'
      );
      setRemoveTarget(null);
    }
  }

  async function handleDelete() {
    setActionError(null);
    try {
      await projectsApi.remove(projectId);
      window.location.href = '/projects';
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : 'Failed to delete project.'
      );
      setDeleteOpen(false);
    }
  }

  const availableToAdd = (orgMembers ?? []).filter(
    orgMember =>
      !members?.some(
        projectMember => projectMember.user_id === orgMember.user_id
      )
  );

  return (
    <div>
      <Alert variant='error'>{actionError}</Alert>
      <Alert variant='success' onDismiss={() => setSaveSuccess(false)}>
        {saveSuccess ? 'Project updated.' : null}
      </Alert>

      <div className='page-actions'>
        <a className='btn btn-primary' href={`/projects/${projectId}/board`}>
          Open Kanban board
        </a>
      </div>

      {canManage ? (
        <form className='form' onSubmit={handleSave} noValidate>
          <TextField
            label='Name'
            required
            value={name}
            onChange={event => setName(event.target.value)}
            disabled={saving}
          />
          <TextField
            label='Description'
            value={description}
            onChange={event => setDescription(event.target.value)}
            disabled={saving}
          />

          <div className='form-field'>
            <label className='form-label' htmlFor='project-status'>
              Status
            </label>
            <select
              id='project-status'
              className='form-input'
              value={project.status}
              onChange={event =>
                handleStatusChange(event.target.value as ProjectStatus)
              }
            >
              {STATUS_OPTIONS.map(status => (
                <option key={status} value={status}>
                  {formatEnumLabel(status)}
                </option>
              ))}
            </select>
          </div>

          <div className='form-actions'>
            <Button type='submit' variant='primary' disabled={saving}>
              {saving ? 'Saving…' : 'Save changes'}
            </Button>
          </div>
        </form>
      ) : (
        <div>
          <p>{project.description || 'No description.'}</p>
          <span className='badge badge-neutral'>
            {formatEnumLabel(project.status)}
          </span>
        </div>
      )}

      <div className='page-section'>
        <h2>Members</h2>
        {!members ? (
          <p className='loading-state' role='status'>
            Loading…
          </p>
        ) : members.length === 0 ? (
          <p className='empty-state'>No members yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                {canManage && <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {members.map(member => (
                <tr key={member.id}>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  {canManage && (
                    <td>
                      <Button
                        variant='danger'
                        onClick={() => setRemoveTarget(member)}
                        aria-label={`Remove ${member.name}`}
                      >
                        Remove
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {canManage && (
          <div className='form-actions'>
            <label className='sr-only' htmlFor='add-member-select'>
              Add an organization member
            </label>
            <select
              id='add-member-select'
              className='form-input'
              value={addMemberId}
              onChange={event => setAddMemberId(event.target.value)}
            >
              <option value=''>Add an organization member…</option>
              {availableToAdd.map(orgMember => (
                <option key={orgMember.user_id} value={orgMember.user_id}>
                  {orgMember.name}
                </option>
              ))}
            </select>
            <Button
              variant='secondary'
              onClick={handleAddMember}
              disabled={!addMemberId}
            >
              Add
            </Button>
          </div>
        )}
      </div>

      {canManage && (
        <div className='page-section'>
          <h2>Danger zone</h2>
          <Button variant='danger' onClick={() => setDeleteOpen(true)}>
            Delete project
          </Button>
        </div>
      )}

      <ConfirmDialog
        open={removeTarget !== null}
        title='Remove member'
        message={`Remove ${
          removeTarget?.name ?? 'this member'
        } from the project?`}
        confirmLabel='Remove'
        danger
        onConfirm={handleRemoveMember}
        onCancel={() => setRemoveTarget(null)}
      />

      <ConfirmDialog
        open={deleteOpen}
        title='Delete project'
        message={`Delete "${project.name}"? This cannot be undone.`}
        confirmLabel='Delete'
        danger
        onConfirm={handleDelete}
        onCancel={() => setDeleteOpen(false)}
      />
    </div>
  );
}
