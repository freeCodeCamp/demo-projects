# Updating/Adding a demo project

## Project structure

All projects should have `start` and `test` scripts in their package.json's
scripts section. `start` is necessary, since `pm2` will use it to start the
project. `test` is optional, but recommended to ensure that, at bare minimum,
the project can be started.

### Projects with build steps

If the project needs building starting `start` can be run, the build script must be
called by the `prepare` script. If this is done, the workflow below trigger the build automatically.

If bundling is required, please follow the example of `build-a-pinterest-clone` and use `rollup` to bundle the project.

## How do I update everything in one go?

- SSH into the VM with `ssh freecodecamp@<ip>`
- Run all the commands in `./scripts/update.sh`

### But just wanted to run a single script!

Fine. You can just run

```sh
./scripts/update.sh
```

but I _strongly_ recommend at least reading it first. Just in case it has not been updated to match new workflows.

## After a PR has been merged to the demo-projects repo:

- SSH into the VM with `ssh freecodecamp@<ip>`
- `cd` to the `demo-projects` folder
- `git fetch —all` to get new changes
- `git pull origin master` to add the new changes

## If updating all projects:

- If needed: update packages
  - `npm ci --production`
- If any enviroment variables have changed, update those projects' `.env` files.

### Reload all projects:

- `npm run reload`

## If updating a single project:

- If needed: update packages
  - `npm ci --production -w=apps/project-name` to update modules
- If the enviroment variables have changed, update the `.env` file.
- `pm2 list` to confirm that `project-name` is the name of the process.

### Reload the project:

- `npm run reload -- --only=<project-name>`

## If adding a new project:

### Make the PR's
- In the `demo-projects` repo
  - Make sure the new project is in the `port-map.json` file. Update also `package.json` and `package-lock.json`
- In the `demo-projects-nginx-config` repo, configure the new app:
  - Add config in `/sites-enabled/10-freecodecamp.rocks.conf` by copying config for one of the other projects and changing the names
  - Also add the title at the top of that file
  - Then, add the project with its port in `configs/upstreams.conf` like the others

### In the VM
- ssh into the VM
- update the nginx config:
  - `cd` to the `/etc/nginx` folder
  - Use `sudo` for the next few commands if you get a permission denied error
  - `git fetch --all` to get new changes
  - `git pull origin main` to add new changes
  - Reload `nginx` with the new config using `sudo nginx -s reload`
- update the demo projects:
  - `cd` into the `~/demo-projects` folder
  - `git fetch --all` to get the new changes
  - `git pull origin main` to add new changes
  - run `npm ci` to install dependencies for all the projects
  - Add anything needed in any of the projects - likely a `.env` file with values
  - `cd` into the `~/demo-projects/apps` folder
  - Start the project with `npm start -- --only=<project-name>`

### Add the new subdomains to Cloudflare
- Add the `https://<project>.freecodecamp.rocks` URL to our [Cloudflare](https://www.cloudflare.com/) by:
  - Going to our [Cloudflare Dashboard](https://dash.cloudflare.com/)
  - Open the `freecodecamp.rocks` domain
  - Click the `DNS` button at the top
  - Click `Add record`
  - Set the new record to `type` `A`
  - Set the new record `name` to the name of the project (sub-domain)
  - Set the new record `IPv4 address` to the ip of the VM
  - Click `save`

## After changing node version

Run

- `pm2 unstartup systemd`
- `pm2 startup`

Then run the command it says to run. Now it should restart after VM reboots.
