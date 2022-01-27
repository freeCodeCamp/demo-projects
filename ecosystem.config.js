const fs = require("fs");
const dotenv = require("dotenv");
const path = require("path");

const { workspaces } = require("./package.json");
const portMap = require("./port-map.json");

const applist = workspaces.map((pkg) => ({
  cwd: pkg,
  name: getName(pkg),
  env: parsePackageEnv(pkg),
}));

function getName(pkg) {
  return pkg.split("/").pop();
}

function parsePackageEnv(pkg) {
  const filePath = path.resolve(pkg, ".env");
  return dotenv.parse(fs.readFileSync(filePath));
}

// watch does not work if the script is npm. Also, watching in production is
// unwise. Finally, the proxy apps alter their own files on start, so would end
// up in a loop. In short, we should not use watch.
module.exports = {
  apps: applist.map(({ name, env, cwd }) => ({
    name,
    script: `npm start`,
    cwd,
    env: { ...env, PORT: portMap[name] },
    max_memory_restart: "200M",
  })),
};
