export type InvitationRole = 'admin' | 'member';

export interface Invitation {
  id: number;
  organization_id: number;
  email: string;
  role: InvitationRole;
  token: string;
  invited_by: number;
  accepted_at: string | null;
  expires_at: string;
  created_at: string;
}
