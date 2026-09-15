import { Router } from 'express';
import { notFoundHandler } from '../middleware/not-found.js';
import { attachmentsRouter } from './attachments.routes.js';
import { authRouter } from './auth.routes.js';
import { commentsRouter } from './comments.routes.js';
import { invitationsRouter } from './invitations.routes.js';
import { labelsRouter } from './labels.routes.js';
import { notificationsRouter } from './notifications.routes.js';
import { organizationsRouter } from './organizations.routes.js';
import { projectsRouter } from './projects.routes.js';
import { tasksRouter } from './tasks.routes.js';
import { usersRouter } from './users.routes.js';

export const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/users', usersRouter);
apiRouter.use('/organizations', organizationsRouter);
apiRouter.use('/invitations', invitationsRouter);
apiRouter.use('/projects', projectsRouter);
apiRouter.use('/tasks', tasksRouter);
apiRouter.use('/labels', labelsRouter);
apiRouter.use('/comments', commentsRouter);
apiRouter.use('/notifications', notificationsRouter);
apiRouter.use('/attachments', attachmentsRouter);

// Scoped here (not mounted globally on `app`) so an unmatched path outside
// /api/v1 — a real page route in the production build, where this API and
// the Astro app share one process (see server/src/prod.ts) — can fall
// through to the Astro handler instead of getting a JSON 404 from this API.
apiRouter.use(notFoundHandler);
