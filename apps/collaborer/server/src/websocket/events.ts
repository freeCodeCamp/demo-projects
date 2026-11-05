export const WS_EVENTS = {
  TASK_UPDATED: 'task.updated',
  COMMENT_CREATED: 'comment.created'
} as const;

export type WsEventType = (typeof WS_EVENTS)[keyof typeof WS_EVENTS];

export interface WsEvent {
  type: WsEventType;
  data: unknown;
}
