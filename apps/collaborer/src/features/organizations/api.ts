import { apiFetch, type PaginatedResult } from '../../lib/api/client.js';
import type {
  CreateInvitationInput,
  CreateOrganizationInput,
  Invitation,
  InvitationPreview,
  Organization,
  OrganizationMember,
  OrganizationRole,
  UpdateOrganizationInput
} from './types.js';

export const organizationsApi = {
  async listMine(): Promise<Organization[]> {
    const { data } = await apiFetch<{ data: Organization[] }>('/organizations');
    return data;
  },

  async create(input: CreateOrganizationInput): Promise<Organization> {
    const { data } = await apiFetch<{ data: Organization }>('/organizations', {
      method: 'POST',
      body: input
    });
    return data;
  },

  async getById(organizationId: number): Promise<Organization> {
    const { data } = await apiFetch<{ data: Organization }>(
      `/organizations/${organizationId}`
    );
    return data;
  },

  async update(
    organizationId: number,
    input: UpdateOrganizationInput
  ): Promise<Organization> {
    const { data } = await apiFetch<{ data: Organization }>(
      `/organizations/${organizationId}`,
      {
        method: 'PATCH',
        body: input
      }
    );
    return data;
  },

  remove(organizationId: number): Promise<void> {
    return apiFetch<void>(`/organizations/${organizationId}`, {
      method: 'DELETE'
    });
  },

  listMembers(
    organizationId: number,
    page = 1
  ): Promise<PaginatedResult<OrganizationMember>> {
    return apiFetch<PaginatedResult<OrganizationMember>>(
      `/organizations/${organizationId}/members?page=${page}`
    );
  },

  changeMemberRole(
    organizationId: number,
    userId: number,
    role: OrganizationRole
  ): Promise<void> {
    return apiFetch<void>(
      `/organizations/${organizationId}/members/${userId}`,
      { method: 'PATCH', body: { role } }
    );
  },

  removeMember(organizationId: number, userId: number): Promise<void> {
    return apiFetch<void>(
      `/organizations/${organizationId}/members/${userId}`,
      { method: 'DELETE' }
    );
  },

  async createInvitation(
    organizationId: number,
    input: CreateInvitationInput
  ): Promise<Invitation> {
    const { data } = await apiFetch<{ data: Invitation }>(
      `/organizations/${organizationId}/invitations`,
      {
        method: 'POST',
        body: input
      }
    );
    return data;
  },

  async listInvitations(organizationId: number): Promise<Invitation[]> {
    const { data } = await apiFetch<{ data: Invitation[] }>(
      `/organizations/${organizationId}/invitations`
    );
    return data;
  },

  async getInvitationByToken(token: string): Promise<InvitationPreview> {
    const { data } = await apiFetch<{ data: InvitationPreview }>(
      `/invitations/${token}`
    );
    return data;
  },

  acceptInvitation(token: string): Promise<void> {
    return apiFetch<void>(`/invitations/${token}/accept`, { method: 'POST' });
  }
};
