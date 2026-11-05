import { apiFetch, type PaginatedResult } from '../../lib/api/client.js';
import type {
  Activity,
  CreateLabelInput,
  CreateProjectInput,
  Label,
  Project,
  ProjectMember,
  UpdateProjectInput
} from './types.js';

export const projectsApi = {
  async listForOrganization(organizationId: number): Promise<Project[]> {
    const { data } = await apiFetch<{ data: Project[] }>(
      `/organizations/${organizationId}/projects`
    );
    return data;
  },

  async create(
    organizationId: number,
    input: CreateProjectInput
  ): Promise<Project> {
    const { data } = await apiFetch<{ data: Project }>(
      `/organizations/${organizationId}/projects`,
      {
        method: 'POST',
        body: input
      }
    );
    return data;
  },

  async getById(projectId: number): Promise<Project> {
    const { data } = await apiFetch<{ data: Project }>(
      `/projects/${projectId}`
    );
    return data;
  },

  async update(projectId: number, input: UpdateProjectInput): Promise<Project> {
    const { data } = await apiFetch<{ data: Project }>(
      `/projects/${projectId}`,
      { method: 'PATCH', body: input }
    );
    return data;
  },

  remove(projectId: number): Promise<void> {
    return apiFetch<void>(`/projects/${projectId}`, { method: 'DELETE' });
  },

  async listMembers(projectId: number): Promise<ProjectMember[]> {
    const { data } = await apiFetch<{ data: ProjectMember[] }>(
      `/projects/${projectId}/members`
    );
    return data;
  },

  addMember(projectId: number, userId: number): Promise<void> {
    return apiFetch<void>(`/projects/${projectId}/members`, {
      method: 'POST',
      body: { userId }
    });
  },

  removeMember(projectId: number, userId: number): Promise<void> {
    return apiFetch<void>(`/projects/${projectId}/members/${userId}`, {
      method: 'DELETE'
    });
  },

  listActivity(
    projectId: number,
    page = 1
  ): Promise<PaginatedResult<Activity>> {
    return apiFetch<PaginatedResult<Activity>>(
      `/projects/${projectId}/activity?page=${page}`
    );
  },

  async listLabels(projectId: number): Promise<Label[]> {
    const { data } = await apiFetch<{ data: Label[] }>(
      `/projects/${projectId}/labels`
    );
    return data;
  },

  async createLabel(
    projectId: number,
    input: CreateLabelInput
  ): Promise<Label> {
    const { data } = await apiFetch<{ data: Label }>(
      `/projects/${projectId}/labels`,
      {
        method: 'POST',
        body: input
      }
    );
    return data;
  }
};
