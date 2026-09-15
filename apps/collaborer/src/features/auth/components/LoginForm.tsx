import { useState, type SubmitEvent } from 'react';
import { Alert } from '../../../components/alert.js';
import { Button } from '../../../components/button.js';
import { TextField } from '../../../components/text-field.js';
import { ApiError } from '../../../lib/api/client.js';
import { useSession } from '../../../lib/auth/session.js';
import { authApi } from '../api.js';

type LoginFormProps = {
  // Where to send the user after a successful login — e.g. back to the
  // invitation they came from, instead of always dropping them on the
  // dashboard. Pre-sanitized (same-origin path only) by the .astro page.
  redirectTo?: string | null;
};

export function LoginForm({ redirectTo }: LoginFormProps) {
  const session = useSession();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  if (session.status === 'loading') {
    return (
      <p className='loading-state' role='status'>
        Loading…
      </p>
    );
  }
  // Already logged in — the login form itself makes no sense here.
  if (session.status === 'authenticated') {
    if (typeof window !== 'undefined')
      window.location.href = redirectTo ?? '/dashboard';
    return <></>;
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setFormError(null);

    try {
      await authApi.login({ email, password });
      window.location.href = redirectTo ?? '/dashboard';
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

      <TextField
        label='Password'
        type='password'
        autoComplete='current-password'
        required
        value={password}
        onChange={event => setPassword(event.target.value)}
        disabled={submitting}
      />

      <div className='form-actions'>
        <Button type='submit' variant='primary' disabled={submitting}>
          {submitting ? 'Logging in…' : 'Log in'}
        </Button>
      </div>

      <p className='form-footer'>
        Forgot your password? <a href='/password-reset'>Reset it</a>.
        <br />
        Don't have an account?{' '}
        <a
          href={
            redirectTo
              ? `/register?redirect=${encodeURIComponent(redirectTo)}`
              : '/register'
          }
        >
          Sign up
        </a>
        .
      </p>
    </form>
  );
}
