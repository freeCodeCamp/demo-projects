export interface ProjectSocketEvent {
  type: 'task.updated' | 'comment.created';
  data: unknown;
}

export interface ProjectSocketHandlers {
  onEvent?: (event: ProjectSocketEvent) => void;
  // Fired once the socket is open — including the very first connect *and*
  // every reconnect. Events that occurred while disconnected are never
  // replayed (there's no server-side queue), so the caller should treat this
  // as "refetch current state from the REST API", not just "we're back".
  onReconnect?: () => void;
  onError?: (error: unknown) => void;
}

const RECONNECT_BASE_DELAY_MS = 1000;
const RECONNECT_MAX_DELAY_MS = 15000;

function getWebSocketBaseUrl(): string {
  const configured = import.meta.env.PUBLIC_WEBSOCKET_URL as string | undefined;
  if (configured) return configured;
  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${protocol}//${window.location.host}`;
}

// One connection per project, matching the backend's model (see
// server/src/websocket/server.ts). A page watching multiple projects at once
// would create multiple ProjectSocket instances rather than one multiplexed one.
export class ProjectSocket {
  private readonly projectId: number;
  private readonly handlers: ProjectSocketHandlers;
  private socket: WebSocket | null = null;
  private reconnectAttempt = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private closedByCaller = false;

  constructor(projectId: number, handlers: ProjectSocketHandlers = {}) {
    this.projectId = projectId;
    this.handlers = handlers;
  }

  connect(): void {
    this.closedByCaller = false;
    this.open();
  }

  close(): void {
    this.closedByCaller = true;
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.socket?.close();
    this.socket = null;
  }

  private open(): void {
    const url = `${getWebSocketBaseUrl()}/ws?projectId=${this.projectId}`;
    const socket = new WebSocket(url);
    this.socket = socket;

    socket.addEventListener('open', () => {
      this.reconnectAttempt = 0;
      this.handlers.onReconnect?.();
    });

    socket.addEventListener('message', event => {
      try {
        const parsed = JSON.parse(event.data as string) as ProjectSocketEvent;
        this.handlers.onEvent?.(parsed);
      } catch (error) {
        this.handlers.onError?.(error);
      }
    });

    socket.addEventListener('close', () => {
      if (this.closedByCaller) return;
      this.scheduleReconnect();
    });

    socket.addEventListener('error', error => {
      this.handlers.onError?.(error);
    });
  }

  private scheduleReconnect(): void {
    const delay = Math.min(
      RECONNECT_BASE_DELAY_MS * 2 ** this.reconnectAttempt,
      RECONNECT_MAX_DELAY_MS
    );
    this.reconnectAttempt += 1;
    this.reconnectTimer = setTimeout(() => this.open(), delay);
  }
}
