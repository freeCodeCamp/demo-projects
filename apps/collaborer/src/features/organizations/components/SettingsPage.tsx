import { useEffect, useState, type SubmitEvent } from 'react';
import { Alert } from '../../../components/alert.js';
import { Button } from '../../../components/button.js';
import { TextField } from '../../../components/text-field.js';
import { useSession } from '../../../lib/auth/session.js';
import { organizationsApi } from '../api.js';
import { useOrganizations } from '../hooks.js';

export function SettingsPage() {
  const session = useSession();
  const orgState = useOrganizations();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const currentOrgId = orgState.status === 'ready' ? orgState.current.id : null;

  useEffect(() => {
    if (orgState.status === 'ready') {
      setName(orgState.current.name);
      setDescription(orgState.current.description ?? '');
    }
    // Only re-sync when the *selected* org changes, not on every render (see
    // the comment in MembersPage.tsx — orgState is a new object each render).
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
    return <p className='empty-state'>Create an organization first.</p>;
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting || orgState.status !== 'ready') return;

    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      await organizationsApi.update(orgState.current.id, { name, description });
      orgState.refresh();
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save changes.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className='form' onSubmit={handleSubmit} noValidate>
      <Alert variant='error'>{error}</Alert>
      <Alert variant='success' onDismiss={() => setSuccess(false)}>
        {success ? 'Organization updated.' : null}
      </Alert>

      <TextField
        label='Name'
        required
        value={name}
        onChange={event => setName(event.target.value)}
        disabled={submitting}
      />

      <TextField
        label='Description'
        value={description}
        onChange={event => setDescription(event.target.value)}
        disabled={submitting}
      />

      <div className='form-actions'>
        <Button type='submit' variant='primary' disabled={submitting}>
          {submitting ? 'Saving…' : 'Save changes'}
        </Button>
      </div>
    </form>
  );
}
