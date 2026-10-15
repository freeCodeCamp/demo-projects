export interface Organization {
  id: number;
  name: string;
  description: string | null;
  logo_url: string | null;
  owner_id: number;
  created_at: string;
  updated_at: string;
}
