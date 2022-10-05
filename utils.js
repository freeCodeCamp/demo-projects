const fs = require('fs');
const path = require('path');

function createEnvFileIfMissing(pkg) {
  const sampleEnvPath = path.resolve(pkg, 'sample.env');
  const envPath = path.resolve(pkg, '.env');

  const hasSampleEnvFile = fs.existsSync(sampleEnvPath);
  const hasEnvFile = fs.existsSync(envPath);

  if (!hasEnvFile && hasSampleEnvFile) fs.copyFileSync(sampleEnvPath, envPath);

  return { envPath, usesEnvFile: hasSampleEnvFile || hasEnvFile };
}

exports.createEnvFileIfMissing = createEnvFileIfMissing;
