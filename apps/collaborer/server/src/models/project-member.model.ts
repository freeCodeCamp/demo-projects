export interface ProjectMember {
  id: number;
  project_id: number;
  user_id: number;
  created_at: string;
}

export interface ProjectMemberWithUser extends ProjectMember {
  name: string;
  email: string;
  avatar_url: string | null;
}
