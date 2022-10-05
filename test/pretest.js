const { createEnvFileIfMissing } = require('../utils');

const { workspaces } = require('../package.json');

workspaces.forEach(createEnvFileIfMissing);
