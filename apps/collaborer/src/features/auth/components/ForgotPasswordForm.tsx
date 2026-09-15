import { useState, type SubmitEvent } from 'react';
import { Alert } from '../../../components/alert.js';
import { Button } from '../../../components/button.js';
import { TextField } from '../../../components/text-field.js';
import { ApiError } from '../../../lib/api/client.js';
import { useSession } from '../../../lib/auth/session.js';
import { authApi } from '../api.js';

export function ForgotPasswordForm() {
  const session = useSession();

  const [email, setEmail] = useState('');
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
      await authApi.forgotPassword(email);
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
        {submitted
          ? 'If that email is registered, a reset link has been sent.'
          : null}
      </Alert>

      {!submitted && (
        <form className='form' onSubmit={handleSubmit} noValidate>
          <Alert variant='error'>{formError}</Alert>

          <TextField
            label='Email'
            type='email'
            autoComplete='email'
            required
            value={email}
            onChange={event => setEmail(event.target.value)}
            disabled={submitting}
          />

          <div className='form-actions'>
            <Button type='submit' variant='primary' disabled={submitting}>
              {submitting ? 'Sending…' : 'Send reset link'}
            </Button>
          </div>

          <p className='form-footer'>
            Remembered your password? <a href='/login'>Log in</a>.
          </p>
        </form>
      )}
    </>
  );
}
