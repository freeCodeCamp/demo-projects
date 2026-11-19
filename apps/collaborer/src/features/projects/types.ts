export type ProjectStatus =
  | 'planning'
  | 'active'
  | 'on_hold'
  | 'completed'
  | 'archived';

export interface Project {
  id: number;
  organization_id: number;
  name: string;
  description: string | null;
  status: ProjectStatus;
  created_by: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectMember {
  id: number;
  project_id: number;
  user_id: number;
  created_at: string;
  name: string;
  email: string;
  avatar_url: string | null;
}

export interface CreateProjectInput {
  name: string;
  description?: string | null;
  status?: ProjectStatus;
}

export interface UpdateProjectInput {
  name?: string;
  description?: string | null;
  status?: ProjectStatus;
}

export interface Label {
  id: number;
  project_id: number;
  name: string;
  color: string;
  created_at: string;
}

export interface CreateLabelInput {
  name: string;
  color: string;
}

export interface Activity {
  id: number;
  organization_id: number;
  project_id: number | null;
  actor_id: number;
  action: string;
  entity_type: string;
  entity_id: number;
  metadata: Record<string, unknown>;
  created_at: string;
  actor_name: string;
}
