import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import { errorHandler } from './middleware/error-handler.js';
import { requestLogger } from './middleware/request-logger.js';
import { apiRouter } from './routes/index.js';

export const app = express();

// CSP is off rather than left at helmet's default: in production this app
// (server/src/prod.ts) also serves the built Astro app, whose inline
// theme-flash-prevention script and <ClientRouter /> would otherwise be
// blocked by the default policy. Inert for this API's own JSON responses
// either way. Authoring a real CSP is a separate follow-up, not this one.
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(requestLogger);

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/status/ping', (_req, res) => {
  res.status(200).send({ msg: 'pong' });
});

app.use('/api/v1', apiRouter);

app.use(errorHandler);
