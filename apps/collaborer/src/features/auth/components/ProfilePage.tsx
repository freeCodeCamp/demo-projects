import { useEffect, useState, type SubmitEvent } from 'react';
import { Alert } from '../../../components/alert.js';
import { Button } from '../../../components/button.js';
import { TextField } from '../../../components/text-field.js';
import { ApiError } from '../../../lib/api/client.js';
import { useSession } from '../../../lib/auth/session.js';
import { authApi } from '../api.js';

export function ProfilePage() {
  const session = useSession();

  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [bio, setBio] = useState('');
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [profileSuccess, setProfileSuccess] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  useEffect(() => {
    if (session.status === 'authenticated') {
      setName(session.user.name);
      setAvatarUrl(session.user.avatar_url ?? '');
      setBio(session.user.bio ?? '');
    }
  }, [session.status === 'authenticated' ? session.user.id : null]);

  if (session.status === 'loading') {
    return (
      <p className='loading-state' role='status'>
        Loading…
      </p>
    );
  }
  if (session.status === 'unauthenticated') {
    if (typeof window !== 'undefined') {
      window.location.href = `/login?redirect=${encodeURIComponent(window.location.pathname)}`;
    }
    return <></>;
  }

  async function handleSaveProfile(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (savingProfile) return;

    setSavingProfile(true);
    setProfileError(null);
    setProfileSuccess(false);

    try {
      await authApi.updateProfile({
        name,
        avatarUrl: avatarUrl || null,
        bio: bio || null
      });
      setProfileSuccess(true);
    } catch (error) {
      setProfileError(
        error instanceof ApiError ? error.message : 'Failed to update profile.'
      );
    } finally {
      setSavingProfile(false);
    }
  }

  async function handleChangePassword(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (changingPassword) return;

    setPasswordError(null);
    setPasswordSuccess(false);

    if (newPassword !== confirmPassword) {
      setPasswordError("New password and confirmation don't match.");
      return;
    }

    setChangingPassword(true);
    try {
      await authApi.changePassword(currentPassword, newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordSuccess(true);
    } catch (error) {
      setPasswordError(
        error instanceof ApiError ? error.message : 'Failed to change password.'
      );
    } finally {
      setChangingPassword(false);
    }
  }

  return (
    <div>
      <section>
        <form className='form' onSubmit={handleSaveProfile} noValidate>
          <Alert variant='error'>{profileError}</Alert>
          <Alert variant='success' onDismiss={() => setProfileSuccess(false)}>
            {profileSuccess ? 'Profile updated.' : null}
          </Alert>

          <TextField
            label='Full name'
            required
            value={name}
            onChange={event => setName(event.target.value)}
            disabled={savingProfile}
          />

          <TextField
            label='Avatar URL'
            type='url'
            value={avatarUrl}
            onChange={event => setAvatarUrl(event.target.value)}
            disabled={savingProfile}
          />

          <TextField
            label='Bio'
            value={bio}
            onChange={event => setBio(event.target.value)}
            disabled={savingProfile}
          />

          <div className='form-actions'>
            <Button type='submit' variant='primary' disabled={savingProfile}>
              {savingProfile ? 'Saving…' : 'Save changes'}
            </Button>
          </div>
        </form>
      </section>

      <section className='page-section'>
        <h2>Change password</h2>
        <form className='form' onSubmit={handleChangePassword} noValidate>
          <Alert variant='error'>{passwordError}</Alert>
          <Alert variant='success' onDismiss={() => setPasswordSuccess(false)}>
            {passwordSuccess ? 'Password changed.' : null}
          </Alert>

          <TextField
            label='Current password'
            type='password'
            autoComplete='current-password'
            required
            value={currentPassword}
            onChange={event => setCurrentPassword(event.target.value)}
            disabled={changingPassword}
          />

          <TextField
            label='New password'
            type='password'
            autoComplete='new-password'
            required
            hint='At least 8 characters.'
            value={newPassword}
            onChange={event => setNewPassword(event.target.value)}
            disabled={changingPassword}
          />

          <TextField
            label='Confirm new password'
            type='password'
            autoComplete='new-password'
            required
            value={confirmPassword}
            onChange={event => setConfirmPassword(event.target.value)}
            disabled={changingPassword}
          />

          <div className='form-actions'>
            <Button type='submit' variant='primary' disabled={changingPassword}>
              {changingPassword ? 'Changing…' : 'Change password'}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}
