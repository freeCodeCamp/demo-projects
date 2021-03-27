const applist = ['american-british-translator'];

module.exports = {
  apps: applist.map((app, index) => {
    return {
      name: app,
      script: `server.js`,
      cwd: `./apps/${app}`,
      watch: true,
      watch_delay: 5000,
      ignore_watch: ['node_modules'],
      env: {
        PORT: 50000 + 10 * (index + 1)
      }
    };
  })
};
