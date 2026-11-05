import { useState, type SubmitEvent } from 'react';
import { Alert } from '../../../components/alert.js';
import { Button } from '../../../components/button.js';
import { Modal } from '../../../components/modal.js';
import { TextField } from '../../../components/text-field.js';
import { ApiError } from '../../../lib/api/client.js';
import { projectsApi } from '../api.js';

type CreateProjectModalProps = {
  open: boolean;
  organizationId: number;
  onClose: () => void;
  onCreated: (projectId: number) => void;
};

export function CreateProjectModal({
  open,
  organizationId,
  onClose,
  onCreated
}: CreateProjectModalProps) {
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
      const project = await projectsApi.create(organizationId, {
        name,
        description: description || undefined
      });
      setName('');
      setDescription('');
      onCreated(project.id);
    } catch (err) {
      setError(
        err instanceof ApiError ? err.message : 'Failed to create project.'
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Modal open={open} onClose={onClose} title='Create a project'>
      <form className='form' onSubmit={handleSubmit} noValidate>
        <Alert variant='error'>{error}</Alert>

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
            {submitting ? 'Creating…' : 'Create project'}
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
