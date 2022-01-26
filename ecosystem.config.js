const parseEnv = require("./parse-package");
const { workspaces } = require("./package.json");

const applist = workspaces.map((name) => ({
  name,
  env: parseEnv(name),
}));

// watch does not work if the script is npm. Also, watching in production is
// unwise. Finally, the proxy apps alter their own files on start, so would end
// up in a loop. In short, we should not use watch.
module.exports = {
  apps: applist.map(({ name, env }, index) => ({
    name,
    script: `npm start`,
    cwd: `./${name}`,
    env: { ...env, PORT: 50000 + 10 * (index + 1) },
  })),
};
