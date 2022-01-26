const fs = require("fs");
const dotenv = require("dotenv");
const path = require("path");

const { workspaces } = require("./package.json");

const applist = workspaces.map((name) => ({
  name,
  env: parsePackage(name),
}));

function parsePackage(pkg) {
  const filePath = path.resolve(pkg, ".env");
  return dotenv.parse(fs.readFileSync(filePath));
}

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
