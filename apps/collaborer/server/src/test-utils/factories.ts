import type { Label } from '../models/label.model.js';
import type { OrganizationRole } from '../models/organization-member.model.js';
import type { Organization } from '../models/organization.model.js';
import type { Project } from '../models/project.model.js';
import type { Task, TaskPriority, TaskStatus } from '../models/task.model.js';
import type { User } from '../models/user.model.js';
import { labelsRepository } from '../repositories/labels.repository.js';
import { organizationMembersRepository } from '../repositories/organization-members.repository.js';
import { organizationsRepository } from '../repositories/organizations.repository.js';
import { projectMembersRepository } from '../repositories/project-members.repository.js';
import { projectsRepository } from '../repositories/projects.repository.js';
import { tasksRepository } from '../repositories/tasks.repository.js';
import { usersRepository } from '../repositories/users.repository.js';

let counter = 0;
function unique(prefix: string): string {
  counter += 1;
  return `${prefix}${counter}`;
}

// Real repository calls against the test DB (per project convention: no
// mocking the database in tests) — these are just convenience wrappers so
// every test isn't rebuilding the same user/org/project/task boilerplate.

export function createUser(
  overrides: Partial<{ email: string; username: string; name: string }> = {}
): User {
  const id = unique('user');
  return usersRepository.create({
    email: overrides.email ?? `${id}@example.com`,
    username: overrides.username ?? id,
    name: overrides.name ?? id,
    passwordHash: 'test-hash'
  });
}

export function createOrganization(
  owner: User,
  overrides: Partial<{ name: string }> = {}
): Organization {
  return organizationsRepository.createWithOwner({
    name: overrides.name ?? unique('org'),
    description: null,
    ownerId: owner.id
  });
}

export function addOrganizationMember(
  organization: Organization,
  user: User,
  role: OrganizationRole = 'member'
): void {
  organizationMembersRepository.create(organization.id, user.id, role);
}

// Also adds the creator as an explicit project member, matching
// projectsService.create's real behavior.
export function createProject(
  organization: Organization,
  creator: User,
  overrides: Partial<{ name: string }> = {}
): Project {
  const project = projectsRepository.create({
    organizationId: organization.id,
    name: overrides.name ?? unique('project'),
    description: null,
    status: 'planning',
    createdBy: creator.id
  });
  projectMembersRepository.add(project.id, creator.id);
  return project;
}

export function addProjectMember(project: Project, user: User): void {
  projectMembersRepository.add(project.id, user.id);
}

export function createLabel(
  project: Project,
  overrides: Partial<{ name: string; color: string }> = {}
): Label {
  return labelsRepository.create(
    project.id,
    overrides.name ?? unique('label'),
    overrides.color ?? '#ff0000'
  );
}

export function createTask(
  project: Project,
  creator: User,
  overrides: Partial<{
    title: string;
    assigneeId: number | null;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string | null;
  }> = {}
): Task {
  return tasksRepository.create({
    projectId: project.id,
    title: overrides.title ?? unique('task'),
    description: null,
    status: overrides.status ?? 'backlog',
    priority: overrides.priority ?? 'medium',
    assigneeId: overrides.assigneeId ?? null,
    creatorId: creator.id,
    dueDate: overrides.dueDate ?? null
  });
}
