import { useCallback, useEffect, useState } from 'react';
import { Alert } from '../../../components/alert.js';
import { Button } from '../../../components/button.js';
import { ApiError } from '../../../lib/api/client.js';
import { useSession } from '../../../lib/auth/session.js';
import { organizationsApi } from '../api.js';
import type { InvitationPreview } from '../types.js';

type AcceptInvitationPageProps = {
  token: string;
};

export function AcceptInvitationPage({ token }: AcceptInvitationPageProps) {
  const session = useSession();

  const [invitation, setInvitation] = useState<InvitationPreview | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [accepting, setAccepting] = useState(false);
  const [acceptError, setAcceptError] = useState<string | null>(null);

  const load = useCallback(() => {
    setLoadError(null);
    organizationsApi
      .getInvitationByToken(token)
      .then(setInvitation)
      .catch(err =>
        setLoadError(
          err instanceof ApiError
            ? err.message
            : 'This invitation link is invalid.'
        )
      );
  }, [token]);

  useEffect(load, [load]);

  async function handleAccept() {
    setAccepting(true);
    setAcceptError(null);
    try {
      await organizationsApi.acceptInvitation(token);
      window.location.href = '/dashboard';
    } catch (err) {
      setAcceptError(
        err instanceof ApiError ? err.message : 'Failed to accept invitation.'
      );
      setAccepting(false);
    }
  }

  if (loadError) {
    return (
      <p className='error-state' role='alert'>
        {loadError}
      </p>
    );
  }
  if (!invitation || session.status === 'loading') {
    return (
      <p className='loading-state' role='status'>
        Loading…
      </p>
    );
  }

  return (
    <div>
      {/* Rendered unconditionally (rather than the "already accepted" state
          swapping out the whole tree) so the live-region container already
          exists in the DOM before it's populated — a role="status" node that
          only enters the DOM once it already has content doesn't reliably
          get announced. */}
      <Alert variant='success'>
        {invitation.accepted
          ? 'This invitation has already been accepted.'
          : null}
      </Alert>

      {!invitation.accepted && invitation.expired && (
        <p className='error-state' role='alert'>
          This invitation has expired. Ask an admin to send a new one.
        </p>
      )}

      {!invitation.accepted && !invitation.expired && (
        <>
          <p>
            You've been invited to join{' '}
            <strong>{invitation.organizationName}</strong> as{' '}
            {invitation.role === 'admin' ? 'an' : 'a'}{' '}
            <strong>{invitation.role}</strong>, for the email address{' '}
            <strong>{invitation.email}</strong>.
          </p>

          <Alert variant='error'>{acceptError}</Alert>

          {session.status === 'unauthenticated' && (
            <div className='form-actions'>
              <Button
                variant='primary'
                href={`/login?redirect=${encodeURIComponent(
                  `/invitations/${token}`
                )}`}
              >
                Log in
              </Button>
              <Button
                variant='secondary'
                href={`/register?redirect=${encodeURIComponent(
                  `/invitations/${token}`
                )}`}
              >
                Create an account
              </Button>
            </div>
          )}

          {session.status === 'authenticated' &&
            session.user.email !== invitation.email && (
              <Alert variant='error'>
                You're logged in as {session.user.email}, but this invitation
                was sent to {invitation.email}. Log out and log in with the
                invited address to accept it.
              </Alert>
            )}

          {session.status === 'authenticated' &&
            session.user.email === invitation.email && (
              <div className='form-actions'>
                <Button
                  variant='primary'
                  onClick={handleAccept}
                  disabled={accepting}
                >
                  {accepting
                    ? 'Joining…'
                    : `Join ${invitation.organizationName}`}
                </Button>
              </div>
            )}
        </>
      )}
    </div>
  );
}
