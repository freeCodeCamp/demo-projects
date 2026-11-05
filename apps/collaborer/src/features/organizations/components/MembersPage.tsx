import { useCallback, useEffect, useState } from 'react';
import { Alert } from '../../../components/alert.js';
import { Button } from '../../../components/button.js';
import { ConfirmDialog } from '../../../components/confirm-dialog.js';
import { useSession } from '../../../lib/auth/session.js';
import { organizationsApi } from '../api.js';
import { useOrganizations } from '../hooks.js';
import type {
  Invitation,
  OrganizationMember,
  OrganizationRole
} from '../types.js';
import { InviteMemberModal } from './InviteMemberModal.js';

// No email delivery is wired up yet (see the backend TODO), so the invite
// link has to be copied and shared manually.
function invitationLink(token: string): string {
  return typeof window === 'undefined'
    ? ''
    : `${window.location.origin}/invitations/${token}`;
}

const ASSIGNABLE_ROLES: OrganizationRole[] = ['member', 'admin', 'owner'];

export function MembersPage() {
  const session = useSession();
  const orgState = useOrganizations();

  const [members, setMembers] = useState<OrganizationMember[] | null>(null);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [removeTarget, setRemoveTarget] = useState<OrganizationMember | null>(
    null
  );
  const [copiedInvitationId, setCopiedInvitationId] = useState<number | null>(
    null
  );

  const load = useCallback((organizationId: number) => {
    setLoadError(null);
    organizationsApi
      .listMembers(organizationId)
      .then(result => setMembers(result.data))
      .catch(err =>
        setLoadError(
          err instanceof Error ? err.message : 'Failed to load members.'
        )
      );

    // Listing pending invitations is admin/owner-only on the backend — a plain
    // member gets a 403 here, which just means "no invitations to show them".
    organizationsApi
      .listInvitations(organizationId)
      .then(setInvitations)
      .catch(() => setInvitations([]));
  }, []);

  const currentOrgId = orgState.status === 'ready' ? orgState.current.id : null;

  // orgState is a freshly built object every render (see useOrganizations), so
  // depending on it directly would refetch on every render — depend on the id.
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
        Create an organization first to manage members.
      </p>
    );
  }

  const organizationId = orgState.current.id;
  const me = members?.find(member => member.user_id === session.user.id);
  const canManage = me?.role === 'owner' || me?.role === 'admin';

  async function handleRoleChange(
    member: OrganizationMember,
    role: OrganizationRole
  ) {
    setActionError(null);
    try {
      await organizationsApi.changeMemberRole(
        organizationId,
        member.user_id,
        role
      );
      load(organizationId);
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : 'Failed to change role.'
      );
    }
  }

  async function handleCopyLink(invitation: Invitation) {
    try {
      await navigator.clipboard.writeText(invitationLink(invitation.token));
      setCopiedInvitationId(invitation.id);
      setTimeout(
        () =>
          setCopiedInvitationId(current =>
            current === invitation.id ? null : current
          ),
        2000
      );
    } catch {
      setActionError("Couldn't copy the link — copy it manually instead.");
    }
  }

  async function handleRemove() {
    if (!removeTarget) return;
    setActionError(null);
    try {
      await organizationsApi.removeMember(organizationId, removeTarget.user_id);
      setRemoveTarget(null);
      load(organizationId);
    } catch (err) {
      setActionError(
        err instanceof Error ? err.message : 'Failed to remove member.'
      );
      setRemoveTarget(null);
    }
  }

  return (
    <div>
      <Alert variant='error'>{actionError}</Alert>
      <Alert variant='error'>{loadError}</Alert>

      {canManage && (
        <div className='page-actions'>
          <Button variant='primary' onClick={() => setInviteOpen(true)}>
            Invite member
          </Button>
        </div>
      )}

      {!members ? (
        <p className='loading-state' role='status'>
          Loading members…
        </p>
      ) : members.length === 0 ? (
        <p className='empty-state'>No members yet.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              {canManage && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {members.map(member => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>
                  {canManage && member.role !== 'owner' ? (
                    <select
                      className='form-input'
                      value={member.role}
                      onChange={event =>
                        handleRoleChange(
                          member,
                          event.target.value as OrganizationRole
                        )
                      }
                    >
                      {ASSIGNABLE_ROLES.filter(
                        role => role !== 'owner' || me?.role === 'owner'
                      ).map(role => (
                        <option key={role} value={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  ) : (
                    member.role
                  )}
                </td>
                {canManage && (
                  <td>
                    {member.role !== 'owner' && (
                      <Button
                        variant='danger'
                        onClick={() => setRemoveTarget(member)}
                        aria-label={`Remove ${member.name}`}
                      >
                        Remove
                      </Button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {canManage && invitations.length > 0 && (
        <div className='page-section'>
          <h2>Pending invitations</h2>
          <ul>
            {invitations.map(invitation => (
              <li key={invitation.id}>
                {invitation.email} — {invitation.role} (expires{' '}
                {new Date(invitation.expiresAt).toLocaleDateString()}){' '}
                <Button
                  variant='link'
                  onClick={() => handleCopyLink(invitation)}
                  aria-label={
                    copiedInvitationId === invitation.id
                      ? `Copied invite link for ${invitation.email}`
                      : `Copy invite link for ${invitation.email}`
                  }
                >
                  {copiedInvitationId === invitation.id
                    ? 'Copied!'
                    : 'Copy invite link'}
                </Button>
              </li>
            ))}
          </ul>
          <div className='sr-only' role='status'>
            {copiedInvitationId !== null ? 'Invite link copied.' : ''}
          </div>
        </div>
      )}

      <InviteMemberModal
        open={inviteOpen}
        organizationId={organizationId}
        onClose={() => setInviteOpen(false)}
        onInvited={() => {
          setInviteOpen(false);
          load(organizationId);
        }}
      />

      <ConfirmDialog
        open={removeTarget !== null}
        title='Remove member'
        message={`Remove ${
          removeTarget?.name ?? 'this member'
        } from the organization?`}
        confirmLabel='Remove'
        danger
        onConfirm={handleRemove}
        onCancel={() => setRemoveTarget(null)}
      />
    </div>
  );
}
