# LMP Inventory Frontend

Frontend application for the LMP Inventory system built with Vue 3 and Vuetify.

## Prerequisites
- Node.js (v14 or later recommended)
- npm (comes with Node.js) or Yarn

## Install
Clone the repository and install dependencies:

```bash
git clone <repo-url>
cd LMP-Inventory-Front
npm install
# or: yarn install
```

## Development (hot-reload)
Start the development server:

```bash
npm run serve
# or: yarn serve
```

Open http://localhost:8080 in your browser (default port 8080).

## Build for production
Create an optimized production build:

```bash
npm run build
# or: yarn build
```

The output folder is `dist/`.

## Lint
Run the linter/fixer:

```bash
npm run lint
# or: yarn lint
```

## Environment variables
If the app needs to talk to an API, create a local environment file (example):

```
# .env.local
VUE_APP_API_BASE_URL=https://api.example.com
```

## Notes & Troubleshooting
- If the default port 8080 is busy, the dev server will attempt another port — check terminal output.
- Ensure Node and npm versions meet the prerequisites.
- See Vue CLI docs for advanced configuration: https://cli.vuejs.org/config/

If you want, I can add an example `.env.example` file or update the README with project-specific API details.
