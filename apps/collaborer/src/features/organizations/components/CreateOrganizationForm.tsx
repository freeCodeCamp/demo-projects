import { useState, type SubmitEvent } from 'react';
import { Alert } from '../../../components/alert.js';
import { Button } from '../../../components/button.js';
import { TextField } from '../../../components/text-field.js';
import { ApiError } from '../../../lib/api/client.js';
import { organizationsApi } from '../api.js';

type CreateOrganizationFormProps = {
  onCreated: () => void;
};

export function CreateOrganizationForm({
  onCreated
}: CreateOrganizationFormProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setError(null);

    try {
      await organizationsApi.create({
        name,
        description: description || undefined
      });
      onCreated();
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'Failed to create organization.'
      );
      setSubmitting(false);
    }
  }

  return (
    <form className='form' onSubmit={handleSubmit} noValidate>
      <Alert variant='error'>{error}</Alert>

      <TextField
        label='Organization name'
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
          {submitting ? 'Creating…' : 'Create organization'}
        </Button>
      </div>
    </form>
  );
}
