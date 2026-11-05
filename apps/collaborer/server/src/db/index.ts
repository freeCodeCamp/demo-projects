import { createDatabaseConnection } from '../config/database.js';
import { env } from '../config/env.js';

export const db = createDatabaseConnection(env.DATABASE_URL);
