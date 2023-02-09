const cron = require("node-cron");

cron.schedule('0 0 1 * *', () => {
  process.kill(1);
});
