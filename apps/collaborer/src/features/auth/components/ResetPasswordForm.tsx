import { useState, type SubmitEvent } from 'react';
import { Alert } from '../../../components/alert.js';
import { Button } from '../../../components/button.js';
import { TextField } from '../../../components/text-field.js';
import { ApiError } from '../../../lib/api/client.js';
import { useSession } from '../../../lib/auth/session.js';
import { authApi } from '../api.js';

type ResetPasswordFormProps = {
  token: string;
};

export function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const session = useSession();

  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  if (session.status === 'loading') {
    return (
      <p className='loading-state' role='status'>
        Loading…
      </p>
    );
  }
  // Already logged in — use the "Change password" form on Profile instead.
  if (session.status === 'authenticated') {
    if (typeof window !== 'undefined') window.location.href = '/dashboard';
    return <></>;
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setFormError(null);

    try {
      await authApi.resetPassword(token, password);
      setSubmitted(true);
    } catch (error) {
      setFormError(
        error instanceof ApiError
          ? error.message
          : 'Something went wrong. Please try again.'
      );
      setSubmitting(false);
    }
  }

  return (
    <>
      {/* Rendered unconditionally (rather than the form being swapped for this
          on submit) so the live-region container already exists in the DOM
          before submit populates it — a role="status" node that only enters
          the DOM once it already has content doesn't reliably get announced. */}
      <Alert variant='success'>
        {submitted ? (
          <>
            Your password has been reset. You can now{' '}
            <a href='/login'>log in</a>.
          </>
        ) : null}
      </Alert>

      {!submitted && (
        <form className='form' onSubmit={handleSubmit} noValidate>
          <Alert variant='error'>{formError}</Alert>

          <TextField
            label='New password'
            type='password'
            autoComplete='new-password'
            required
            hint='At least 8 characters.'
            value={password}
            onChange={event => setPassword(event.target.value)}
            disabled={submitting}
          />

          <div className='form-actions'>
            <Button type='submit' variant='primary' disabled={submitting}>
              {submitting ? 'Saving…' : 'Set new password'}
            </Button>
          </div>
        </form>
      )}
    </>
  );
}
