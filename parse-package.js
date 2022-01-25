const fs = require("fs/promises");
const dotenv = require("dotenv");
const path = require("path");

async function parsePackage(pkg) {
  const filePath = path.resolve(pkg, ".env");
  try {
    dotenv.parse(await fs.readFile(filePath));
  } catch (e) {
    // TODO: decide if it's ok to only warn if .env files are missing.
    if (e.code === "ENOENT") {
      console.warn(`No .env file found in ${pkg}`);
      return {};
    } else {
      throw e;
    }
  }
}

module.exports = parsePackage;
