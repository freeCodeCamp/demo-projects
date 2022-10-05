const { execSync } = require('child_process');
const { existsSync } = require('fs');
const { resolve } = require('path');

const { workspaces } = require('./package.json');

const test = pkg => {
  // if workspace has a test script, run it
  if (existsSync(resolve(__dirname, pkg, 'package.json'))) {
    const { scripts } = require(resolve(__dirname, pkg, 'package.json'));
    if (scripts && scripts.test) {
      execSync(`npm t -w=${pkg}`, { stdio: 'inherit' }); // pipe output to the calling process's console
    }
  }
};

workspaces.forEach(pkg => test(pkg));
