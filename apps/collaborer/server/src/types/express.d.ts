import type { OrganizationRole } from '../models/organization-member.model.js';
import type { User } from '../models/user.model.js';

declare global {
  namespace Express {
    interface Request {
      user?: User;
      // Set by requireOrganizationRole once membership has been verified —
      // controllers/services must use these, never the raw :organizationId param.
      organizationId?: number;
      organizationRole?: OrganizationRole;
      // Set by requireProjectViewAccess/requireProjectManageAccess once project
      // access has been verified — never re-parse :projectId directly either.
      projectId?: number;
      // Set by requireTaskAccess / requireLabelAccess / requireCommentAccess /
      // requireAttachmentAccess respectively.
      taskId?: number;
      labelId?: number;
      commentId?: number;
      attachmentId?: number;
    }
  }
}

export {};
