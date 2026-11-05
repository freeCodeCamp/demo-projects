export type OrganizationRole = 'owner' | 'admin' | 'member';

export interface OrganizationMember {
  id: number;
  organization_id: number;
  user_id: number;
  role: OrganizationRole;
  created_at: string;
}

export interface OrganizationMemberWithUser extends OrganizationMember {
  name: string;
  email: string;
  avatar_url: string | null;
}
