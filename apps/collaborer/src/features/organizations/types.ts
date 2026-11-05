export type OrganizationRole = 'owner' | 'admin' | 'member';
export type InvitationRole = 'admin' | 'member';

export interface Organization {
  id: number;
  name: string;
  description: string | null;
  logo_url: string | null;
  owner_id: number;
  created_at: string;
  updated_at: string;
}

export interface OrganizationMember {
  id: number;
  organization_id: number;
  user_id: number;
  role: OrganizationRole;
  created_at: string;
  name: string;
  email: string;
  avatar_url: string | null;
}

export interface Invitation {
  id: number;
  email: string;
  role: InvitationRole;
  token: string;
  expiresAt: string;
  createdAt: string;
}

export interface InvitationPreview {
  email: string;
  role: InvitationRole;
  organizationName: string;
  expired: boolean;
  accepted: boolean;
}

export interface CreateOrganizationInput {
  name: string;
  description?: string | null;
}

export interface UpdateOrganizationInput {
  name?: string;
  description?: string | null;
  logoUrl?: string | null;
}

export interface CreateInvitationInput {
  email: string;
  role: InvitationRole;
}
