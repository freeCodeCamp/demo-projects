const fs = require('fs/promises');
const path = require('path');

const { workspaces } = require('../package.json');

workspaces.forEach(async pkg => {
  const sampleEnvPath = path.resolve(pkg, 'sample.env');
  const filePath = path.resolve(pkg, '.env');
  try {
    await fs.copyFile(sampleEnvPath, filePath);
  } catch (err) {
    console.error(
      `Error copying file: ${sampleEnvPath}. Each project needs a sample.env file.`
    );
    throw err;
  }
});
