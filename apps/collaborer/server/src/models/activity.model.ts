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
