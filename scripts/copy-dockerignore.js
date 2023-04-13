const { copyFileSync } = require('fs');
const { join } = require("path");
const portMap = require("../port-map.json");

Object.keys(portMap).forEach((name) => {
  copyFileSync(join(__dirname, "../shared.dockerignore"), join(__dirname, `../apps/${name}/.dockerignore`));
});
