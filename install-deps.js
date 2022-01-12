const { exec } = require("child_process");
const { promisify } = require("util");
const asyncExec = promisify(exec);

const workspaces = [
  "american-british-translator",
  "anonymous-message-board",
  "build-a-pinterest-clone",
  "chart-the-stock-market",
  "exercise-tracker",
  "file-metadata-microservice",
  "forum-proxy",
  "image-search-abstraction-layer",
  "issue-tracker",
  "manage-a-book-trading-club",
  "metric-imperial-converter",
  // "nightlife-coordination-app" - uncomment when this is ported,
  "p2p-video-chat-application",
  "personal-library",
  "request-header-parser-microservice",
  "secure-real-time-multiplayer-game",
  "stock-price-checker",
  "stock-price-checker-proxy",
  "sudoku-solver",
  "timestamp-microservice",
  "twitch-proxy",
  "url-shortener-microservice",
  "voting-app",
  "weather-proxy",
];

(async () => {
  for (const workspace of workspaces) {
    console.log(`Installing: ${workspace}`);
    await asyncExec(`cd ${workspace} && npm ci`);
  }
})();
