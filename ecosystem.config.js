require('dotenv').config();

const applist = [
  {
    name: 'american-british-translator'
  },
  {
    name: 'anonymous-message-board',
    env: {
      DB_URI: process.env.anonymous_message_board_DB_URI
    }
  }
];

module.exports = {
  apps: applist.map((app, index) => {
    const { name, env } = app;
    return {
      name: name,
      script: `server.js`,
      cwd: `./apps/${name}`,
      watch: true,
      watch_delay: 5000,
      ignore_watch: ['node_modules'],
      env: Object.assign(
        {},
        {
          PORT: 50000 + 10 * (index + 1)
        },
        env ? env : {}
      )
    };
  })
};
