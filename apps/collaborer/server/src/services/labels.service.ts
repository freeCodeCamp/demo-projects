import type { Label } from '../models/label.model.js';
import { labelsRepository } from '../repositories/labels.repository.js';
import { NotFoundError } from '../utils/errors.js';

export const labelsService = {
  create(projectId: number, input: { name: string; color: string }): Label {
    return labelsRepository.create(projectId, input.name, input.color);
  },

  listForProject(projectId: number): Label[] {
    return labelsRepository.listByProject(projectId);
  },

  update(labelId: number, input: { name?: string; color?: string }): Label {
    const existing = labelsRepository.findById(labelId);
    if (!existing)
      throw new NotFoundError('LABEL_NOT_FOUND', 'Label not found.');

    return labelsRepository.update(
      labelId,
      input.name ?? existing.name,
      input.color ?? existing.color
    );
  },

  remove(labelId: number): void {
    labelsRepository.remove(labelId);
  }
};
