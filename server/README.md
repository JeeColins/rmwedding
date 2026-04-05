Run the local API server that calls Gemini and keeps the API key server-side.

Setup
1. Add your Gemini API key to the project root `.env.local` as:

   GEMINI_API_KEY=your_key_here

Run
1. For development (recommended): `npm run dev` — starts the server with `nodemon` and Vite concurrently (auto-restarts server on changes).
2. To start only the server: `npm run start:server` (runs on port 3000 by default).
3. To start only the server in dev mode (auto-restart): `npm run dev:server`.

Notes
- The client calls `/api/polish` which is proxied to `http://localhost:3000` in dev by `vite.config.ts`.
- Keep `.env.local` out of source control and use environment secrets in production.
- Consider adding rate-limiting and authentication before deploying to production.
