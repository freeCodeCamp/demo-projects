export interface Comment {
  id: number;
  task_id: number;
  author_id: number;
  body: string;
  created_at: string;
  updated_at: string;
}

export interface CommentWithAuthor extends Comment {
  author_name: string;
  author_avatar_url: string | null;
}
