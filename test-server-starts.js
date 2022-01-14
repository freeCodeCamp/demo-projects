const concurrently = require("concurrently");
const { resolve } = require("path");

const test = async () => {
  const dir = process.argv[2];
  const details = await concurrently(
    [
      { command: "npm start", cwd: resolve(__dirname, dir) },
      { command: "npm run test", cwd: resolve(__dirname, dir) },
    ],
    {
      killOthers: ["success", "failure"],
      // the wait-port command exits with a success/failure, so it would
      // be the first. This config tells concurrently to use that as
      // the total success code.
      successCondition: "first",
    }
  ).result;
  return details;
};

/**
 * The concurrently process throws an error on failed exit codes - we use that
 * to set the root-level process exit code so the CI passes/fails accordingly.
 */
test()
  .then((result) => {
    console.log('Successfully started', process.argv[2])
    process.exit(0);
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
