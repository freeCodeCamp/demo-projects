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
