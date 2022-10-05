const concurrently = require('concurrently');
const { resolve } = require('path');

const { workspaces } = require('./package.json');

const test = async (pkg, port) => {
  const details = await concurrently(
    [
      { command: `PORT=${port} npm start`, cwd: resolve(__dirname, pkg) },
      { command: `wait-port -t 100000 ${port}`, cwd: resolve(__dirname, pkg) }
    ],
    {
      killOthers: ['success', 'failure'],
      // the wait-port command exits with a success/failure, so it would
      // be the first. This config tells concurrently to use that as
      // the total success code.
      successCondition: 'first'
    }
  ).result;
  return details;
};

const run = async () => {
  const firstPort = 3456;
  const tests = workspaces.map(async (pkg, i) => {
    /**
     * The concurrently process throws an error on failed exit codes - we use that
     * to set the root-level process exit code so the CI passes/fails accordingly.
     */
    return test(pkg, firstPort + i)
      .then(() => {
        console.log('Successfully started', pkg);
      })
      .catch(err => {
        console.log(err);
        process.exit(1);
      });
  });
  return Promise.all(tests);
};

run().then(() => process.exit(0));
