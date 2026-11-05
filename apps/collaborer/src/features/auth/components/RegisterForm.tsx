import { useState, type SubmitEvent } from 'react';
import { Alert } from '../../../components/alert.js';
import { Button } from '../../../components/button.js';
import { TextField } from '../../../components/text-field.js';
import { ApiError } from '../../../lib/api/client.js';
import { useSession } from '../../../lib/auth/session.js';
import { authApi } from '../api.js';

type FieldName = 'name' | 'username' | 'email' | 'password';
type FieldErrors = Partial<Record<FieldName, string>>;

const FIELD_NAMES: readonly FieldName[] = [
  'name',
  'username',
  'email',
  'password'
];

function isFieldName(value: string): value is FieldName {
  return (FIELD_NAMES as readonly string[]).includes(value);
}

type RegisterFormProps = {
  // Where to send the user after a successful registration — e.g. back to
  // the invitation they came from, instead of always dropping them on the
  // dashboard. Pre-sanitized (same-origin path only) by the .astro page.
  redirectTo?: string | null;
};

export function RegisterForm({ redirectTo }: RegisterFormProps) {
  const session = useSession();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  if (session.status === 'loading') {
    return (
      <p className='loading-state' role='status'>
        Loading…
      </p>
    );
  }
  // Already logged in — registering a second account from here would be a
  // mistake, not a real use case.
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
    setFieldErrors({});

    try {
      await authApi.register({ name, username, email, password });
      window.location.href = redirectTo ?? '/dashboard';
    } catch (error) {
      if (error instanceof ApiError && error.details) {
        // Field-level messages below are already enough to act on — a
        // generic banner on top of them would just be noise.
        const nextFieldErrors: FieldErrors = {};
        for (const detail of error.details) {
          if (isFieldName(detail.path)) {
            nextFieldErrors[detail.path] = detail.message;
          }
        }
        setFieldErrors(nextFieldErrors);
      } else {
        setFormError(
          error instanceof ApiError
            ? error.message
            : 'Something went wrong. Please try again.'
        );
      }
      setSubmitting(false);
    }
  }

  return (
    <form className='form' onSubmit={handleSubmit} noValidate>
      <Alert variant='error'>{formError}</Alert>

      <TextField
        label='Full name'
        autoComplete='name'
        required
        value={name}
        onChange={event => setName(event.target.value)}
        disabled={submitting}
        error={fieldErrors.name}
      />

      <TextField
        label='Username'
        autoComplete='username'
        required
        hint='3-30 characters: letters, numbers, and underscores. Used for @mentions.'
        value={username}
        onChange={event => setUsername(event.target.value)}
        disabled={submitting}
        error={fieldErrors.username}
      />

      <TextField
        label='Email'
        type='email'
        autoComplete='email'
        required
        value={email}
        onChange={event => setEmail(event.target.value)}
        disabled={submitting}
        error={fieldErrors.email}
      />

      <TextField
        label='Password'
        type='password'
        autoComplete='new-password'
        required
        hint='At least 8 characters.'
        value={password}
        onChange={event => setPassword(event.target.value)}
        disabled={submitting}
        error={fieldErrors.password}
      />

      <div className='form-actions'>
        <Button type='submit' variant='primary' disabled={submitting}>
          {submitting ? 'Creating account…' : 'Create account'}
        </Button>
      </div>

      <p className='form-footer'>
        Already have an account?{' '}
        <a
          href={
            redirectTo
              ? `/login?redirect=${encodeURIComponent(redirectTo)}`
              : '/login'
          }
        >
          Log in
        </a>
        .
      </p>
    </form>
  );
}
