import { app } from './app.js';
import { attachWebSocketServer } from './websocket/server.js';

const port = Number(process.env.PORT) || 4000;

const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

attachWebSocketServer(server);
