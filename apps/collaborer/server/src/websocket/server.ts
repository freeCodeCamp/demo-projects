import type { IncomingMessage, Server as HttpServer } from 'node:http';
import type { Duplex } from 'node:stream';
import { WebSocketServer, type WebSocket } from 'ws';
import { organizationMembersRepository } from '../repositories/organization-members.repository.js';
import { projectMembersRepository } from '../repositories/project-members.repository.js';
import { projectsRepository } from '../repositories/projects.repository.js';
import { verifySessionToken } from '../utils/tokens.js';
import type { WsEvent } from './events.js';

interface ConnectedClient {
  socket: WebSocket;
  userId: number;
  projectId: number;
}

const clients = new Set<ConnectedClient>();

function parseCookies(header: string | undefined): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!header) return cookies;

  for (const part of header.split(';')) {
    const separatorIndex = part.indexOf('=');
    if (separatorIndex === -1) continue;
    const key = part.slice(0, separatorIndex).trim();
    const value = part.slice(separatorIndex + 1).trim();
    if (key) cookies[key] = decodeURIComponent(value);
  }

  return cookies;
}

function authenticateUpgrade(req: IncomingMessage): number | null {
  const token = parseCookies(req.headers.cookie).session;
  if (!token) return null;

  try {
    return verifySessionToken(token).userId;
  } catch {
    return null;
  }
}

// Same "org manager implicit / plain member needs explicit project membership"
// rule as requireProjectViewAccess in middleware/authorize.ts — connections get
// the identical access check REST requests do, just outside Express's pipeline.
function hasProjectAccess(projectId: number, userId: number): boolean {
  const project = projectsRepository.findById(projectId);
  if (!project) return false;

  const membership = organizationMembersRepository.findMembership(
    project.organization_id,
    userId
  );
  if (!membership) return false;

  const isOrgManager =
    membership.role === 'owner' || membership.role === 'admin';
  return isOrgManager || projectMembersRepository.isMember(projectId, userId);
}

function reject(socket: Duplex, statusLine: string): void {
  socket.write(`HTTP/1.1 ${statusLine}\r\n\r\n`);
  socket.destroy();
}

// One connection = one project (matches the Kanban board being a single-project
// view) — a client watching multiple projects simply opens multiple connections.
export function attachWebSocketServer(httpServer: HttpServer): void {
  const wss = new WebSocketServer({ noServer: true });

  httpServer.on('upgrade', (req, socket, head) => {
    if (!req.url?.startsWith('/ws')) {
      socket.destroy();
      return;
    }

    const userId = authenticateUpgrade(req);
    if (!userId) {
      reject(socket, '401 Unauthorized');
      return;
    }

    const url = new URL(req.url, 'http://internal');
    const projectId = Number(url.searchParams.get('projectId'));
    if (!Number.isInteger(projectId)) {
      reject(socket, '400 Bad Request');
      return;
    }

    if (!hasProjectAccess(projectId, userId)) {
      // 404, not 403 — consistent with every REST route for this same resource:
      // don't reveal a project exists to someone who can't access it.
      reject(socket, '404 Not Found');
      return;
    }

    wss.handleUpgrade(req, socket, head, ws => {
      const client: ConnectedClient = { socket: ws, userId, projectId };
      clients.add(client);
      ws.on('close', () => clients.delete(client));
    });
  });
}

export function broadcastToProject(projectId: number, event: WsEvent): void {
  const payload = JSON.stringify(event);

  for (const client of clients) {
    if (
      client.projectId === projectId &&
      client.socket.readyState === client.socket.OPEN
    ) {
      client.socket.send(payload);
    }
  }
}
