const fs = require("fs");
const dotenv = require("dotenv");
const path = require("path");

function parsePackage(pkg) {
  const filePath = path.resolve(pkg, ".env");
  return dotenv.parse(fs.readFileSync(filePath));
}

module.exports = parsePackage;
