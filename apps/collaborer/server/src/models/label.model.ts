export interface Label {
  id: number;
  project_id: number;
  name: string;
  color: string;
  created_at: string;
}

export interface LabelRef {
  id: number;
  name: string;
  color: string;
}
