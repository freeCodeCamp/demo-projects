import { useState, type SubmitEvent } from 'react';
import { Alert } from '../../../components/alert.js';
import { Button } from '../../../components/button.js';
import { Modal } from '../../../components/modal.js';
import { TextField } from '../../../components/text-field.js';
import { ApiError } from '../../../lib/api/client.js';
import { organizationsApi } from '../api.js';
import type { InvitationRole } from '../types.js';

type InviteMemberModalProps = {
  open: boolean;
  organizationId: number;
  onClose: () => void;
  onInvited: () => void;
};

export function InviteMemberModal({
  open,
  organizationId,
  onClose,
  onInvited
}: InviteMemberModalProps) {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<InvitationRole>('member');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      await organizationsApi.createInvitation(organizationId, { email, role });
      setEmail('');
      setRole('member');
      onInvited();
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'Failed to send invitation.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title='Invite a member'>
      <form className='form' onSubmit={handleSubmit} noValidate>
        <Alert variant='error'>{error}</Alert>

        <TextField
          label='Email'
          type='email'
          required
          value={email}
          onChange={event => setEmail(event.target.value)}
          disabled={submitting}
        />

        <div className='form-field'>
          <label className='form-label' htmlFor='invite-role'>
            Role
          </label>
          <select
            id='invite-role'
            className='form-input'
            value={role}
            onChange={event => {
              if (submitting) return;
              setRole(event.target.value as InvitationRole);
            }}
            aria-disabled={submitting || undefined}
          >
            <option value='member'>Member</option>
            <option value='admin'>Admin</option>
          </select>
        </div>

        <div className='form-actions'>
          <Button type='submit' variant='primary' disabled={submitting}>
            {submitting ? 'Sending…' : 'Send invitation'}
          </Button>
          <Button
            type='button'
            variant='secondary'
            onClick={onClose}
            disabled={submitting}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Modal>
  );
}
