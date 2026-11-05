export interface Attachment {
  id: number;
  task_id: number;
  filename: string;
  storage_key: string;
  mime_type: string;
  size: number;
  uploaded_by: number;
  created_at: string;
}

export interface AttachmentWithUploader extends Attachment {
  uploader_name: string;
}
