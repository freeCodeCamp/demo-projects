const parseEnv = require("./parse-package");
const { workspaces } = require("./package.json");

const applist = workspaces.map((name) => ({
  name,
  env: parseEnv(name),
}));

module.exports = {
  apps: applist.map(({ name, env }, index) => ({
    name,
    script: `npm start`,
    cwd: `./${name}`,
    watch: true,
    watch_delay: 5000,
    ignore_watch: ["node_modules"],
    env: { ...env, PORT: 50000 + 10 * (index + 1) },
  })),
};
