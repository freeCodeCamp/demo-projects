import { rm } from 'node:fs/promises';
import path from 'node:path';
import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import { attachmentsService } from './attachments.service.js';
import {
  createOrganization,
  createProject,
  createTask,
  createUser
} from '../test-utils/factories.js';
import { resetTestDatabase } from '../test-utils/db.js';
import { activityRepository } from '../repositories/activity.repository.js';
import { attachmentsRepository } from '../repositories/attachments.repository.js';
import { env } from '../config/env.js';

const STORAGE_ROOT = path.resolve(env.STORAGE_PATH);

function fakeFile(
  overrides: Partial<{
    originalname: string;
    mimetype: string;
    size: number;
    buffer: Buffer;
  }> = {}
) {
  return {
    originalname: overrides.originalname ?? 'notes.txt',
    mimetype: overrides.mimetype ?? 'text/plain',
    size: overrides.size ?? 12,
    buffer: overrides.buffer ?? Buffer.from('hello world')
  };
}

beforeEach(() => {
  resetTestDatabase();
});

afterAll(async () => {
  await rm(STORAGE_ROOT, { recursive: true, force: true });
});

describe('attachmentsService.upload', () => {
  it('stores the file, creates the row, and records an activity entry', async () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const task = createTask(project, owner);

    const attachment = await attachmentsService.upload(
      task.id,
      project.id,
      org.id,
      owner.id,
      fakeFile()
    );

    expect(attachment).toMatchObject({
      task_id: task.id,
      filename: 'notes.txt',
      uploaded_by: owner.id
    });
    expect(activityRepository.listByProject(project.id, 20, 0)).toContainEqual(
      expect.objectContaining({ action: 'attachment.uploaded' })
    );
  });

  it('throws TASK_NOT_FOUND for a missing task', async () => {
    const owner = createUser();

    await expect(
      attachmentsService.upload(999999, 1, 1, owner.id, fakeFile())
    ).rejects.toMatchObject({
      code: 'TASK_NOT_FOUND'
    });
  });
});

describe('attachmentsService.download / remove', () => {
  it('round-trips the exact bytes that were uploaded', async () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const task = createTask(project, owner);
    const content = Buffer.from('the file contents');
    const attachment = await attachmentsService.upload(
      task.id,
      project.id,
      org.id,
      owner.id,
      fakeFile({ buffer: content })
    );

    const { data } = await attachmentsService.download(attachment.id);

    expect(data.equals(content)).toBe(true);
  });

  it('throws ATTACHMENT_NOT_FOUND for a missing attachment', async () => {
    await expect(attachmentsService.download(999999)).rejects.toMatchObject({
      code: 'ATTACHMENT_NOT_FOUND'
    });
  });

  it('lets the uploader delete their attachment, and rejects anyone else', async () => {
    const owner = createUser();
    const org = createOrganization(owner);
    const project = createProject(org, owner);
    const task = createTask(project, owner);
    const attachment = await attachmentsService.upload(
      task.id,
      project.id,
      org.id,
      owner.id,
      fakeFile()
    );
    const someoneElse = createUser();

    await expect(
      attachmentsService.remove(attachment.id, someoneElse.id)
    ).rejects.toMatchObject({
      code: 'FORBIDDEN'
    });

    await attachmentsService.remove(attachment.id, owner.id);
    expect(attachmentsRepository.findById(attachment.id)).toBeUndefined();
  });
});
