import { z } from 'zod';

const statusEnum = z.enum([
  'backlog',
  'todo',
  'in_progress',
  'in_review',
  'done'
]);
const priorityEnum = z.enum(['low', 'medium', 'high', 'urgent']);
const dueDateSchema = z.string().refine(val => !Number.isNaN(Date.parse(val)), {
  message: 'Invalid date.'
});

export const createTaskSchema = z.object({
  title: z.string().trim().min(1).max(200),
  description: z.string().trim().max(5000).nullable().optional(),
  status: statusEnum.optional(),
  priority: priorityEnum.optional(),
  assigneeId: z.number().int().positive().nullable().optional(),
  dueDate: dueDateSchema.nullable().optional()
});

export const updateTaskSchema = z
  .object({
    title: z.string().trim().min(1).max(200).optional(),
    description: z.string().trim().max(5000).nullable().optional(),
    status: statusEnum.optional(),
    priority: priorityEnum.optional(),
    assigneeId: z.number().int().positive().nullable().optional(),
    dueDate: dueDateSchema.nullable().optional()
  })
  .refine(data => Object.keys(data).length > 0, {
    message: 'At least one field must be provided.'
  });

export const taskQuerySchema = z.object({
  status: statusEnum.optional(),
  priority: priorityEnum.optional(),
  assigneeId: z.coerce.number().int().positive().optional(),
  labelId: z.coerce.number().int().positive().optional(),
  dueBefore: dueDateSchema.optional(),
  dueAfter: dueDateSchema.optional(),
  sortBy: z
    .enum(['created_at', 'updated_at', 'due_date', 'priority'])
    .default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc')
});
