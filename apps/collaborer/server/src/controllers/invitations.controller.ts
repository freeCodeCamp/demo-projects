import type { Request, Response } from 'express';
import type { Invitation } from '../models/invitation.model.js';
import { invitationsService } from '../services/invitations.service.js';
import { createInvitationSchema } from '../validators/invitations.validator.js';

function toInvitationResponse(invitation: Invitation) {
  return {
    id: invitation.id,
    email: invitation.email,
    role: invitation.role,
    token: invitation.token,
    expiresAt: invitation.expires_at,
    createdAt: invitation.created_at
  };
}

export const invitationsController = {
  async create(req: Request, res: Response): Promise<void> {
    const input = createInvitationSchema.parse(req.body);
    const invitation = await invitationsService.create(
      req.organizationId!,
      req.user!.id,
      input
    );
    res.status(201).json({ data: toInvitationResponse(invitation) });
  },

  listPending(req: Request, res: Response): void {
    const invitations = invitationsService
      .listPending(req.organizationId!)
      .map(toInvitationResponse);
    res.json({ data: invitations });
  },

  getByToken(req: Request, res: Response): void {
    res.json({ data: invitationsService.getByToken(String(req.params.token)) });
  },

  accept(req: Request, res: Response): void {
    invitationsService.accept(String(req.params.token), req.user!.id);
    res.status(204).send();
  }
};
