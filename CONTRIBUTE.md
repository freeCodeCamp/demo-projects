# Updating/Adding a demo project
## After a PR has been merged to the demo-projects repo:
- SSH into the VM with `ssh freecodecamp@<ip>`
- `cd` to the `demo-projects` folder
- `git fetch —all` to get new changes
- `git pull origin master` to add the new changes

## If updating a project:
- If needed: `cd` into the project folder
  - Make sure the environment variables are set
  - `npm install` to add new modules
  - anything else needed
- `pm2 list` to find the id of the project to restart

#### Reload the project if no .env changes:
- `pm2 reload <project-id>`

#### Reload the project with .env changes:
- `pm2 reload <project-id> —update-env`

## If adding a new project:
- Make a PR to the `demo-projects-nginx-config` repo to configure the new app:
  - Add config in  `/etc/nginx/sites-enabled/10-freecodecamp.rocks.conf` by copying config for one of the other projects and changing the names.
  - Also add the title at the top.
- Merge the PR
- In the VM:
  - `cd` to the `/etc/nginx` folder
  - `git fetch --all` to get new changes
  - `git pull origin master` to add new changes
  - Open the `/etc/nginx/configs/upstreams.conf` file. Set the port for your new project like one of the others. I would try to keep them in alphabetical and numerical order
  - Reload `nginx` with the new config using `sudo nginx -s reload`
  - `cd` into the `/home/freeCodeCamp/demo-projects/<new_project>` folder
  - If needed:
    - Copy the `sample.env`
    - Set `.env` variables
    - `npm install`
    - anything else
  - Start the project with `pm2 start <server-file> —name <project-name> --max-memory-restart 200M`
- Add the `https://<project>.freecodecamp.rocks` URL to our [Cloudflare](https://www.cloudflare.com/) by:
  - Going to our [Cloudflare Dashboard](https://dash.cloudflare.com/)
  - Open the `freecodecamp.rocks` domain
  - Click the `DNS` button at the top
  - Click `Add record`
  - Set the new record to `type` `A`
  - Set the new record `name` to the name of the project (sub-domain)
  - Set the new record `IPv4 address` to the ip of the VM
  - Click `save`
