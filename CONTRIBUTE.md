# Updating/Adding a demo project

## How do I update everything in one go?

- SSH into the VM with `ssh freecodecamp@<ip>`
- Run all the commands in `./scripts/update.sh`

### But just wanted to run a single script!

Fine. You can just run

```sh
./scripts/update.sh
```

but I *strongly* recommend at least reading it first. Just in case it has not been updated to match new workflows.

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

- Make sure the new project is in the `port-map.json` file.
- Make a PR to the `demo-projects-nginx-config` repo to configure the new app:
  - Add config in  `/etc/nginx/sites-enabled/10-freecodecamp.rocks.conf` by copying config for one of the other projects and changing the names.
  - Also add the title at the top.
- Merge the PR
- In the VM:
  - `cd` to the `/etc/nginx` folder
  - `git fetch --all` to get new changes
  - `git pull origin master` to add new changes
  - Open the `/etc/nginx/configs/upstreams.conf` file. Set the port for your new project to the value declared in `port-map.json`. I would try to keep them in alphabetical order.
  - Reload `nginx` with the new config using `sudo nginx -s reload`
  - `cd` into the `/home/freeCodeCamp/demo-projects/<new_project>` folder
  - If needed:
    - Copy the `sample.env`
    - Set `.env` variables
    - `npm install`
    - anything else
  - `cd` into the `/home/freeCodeCamp/demo-projects/<new_project>` folder
  - Make sure you're in the project root! Start the project with `npm start -- --only=<project-name>`
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