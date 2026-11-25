# fso-notes-app (Part 0)

Example application demonstrating traditional web development concepts from Full Stack Open Part 0.

## Local development

1. Install dependencies

```bash
npm install
```

2. Start the server

```bash
npm start
```

Or start in watch mode (requires nodemon):

```bash
npm run dev
```

The app serves static files from the `public/` directory. By default it listens on port 3000.

## Project structure

- `server.js` — Express server serving static assets and handling routes
- `public/` — Client-side assets (JS, CSS, HTML)
- `package.json` — Scripts and dependencies

## License

ISC
