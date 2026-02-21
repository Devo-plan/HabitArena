# Client

React + Next.js frontend (migrated from Vite).

## Getting started

```bash
npm run dev
```

Runs on http://localhost:3001 (Next.js default). API calls use `NEXT_PUBLIC_API_URL` (default: http://localhost:3000).

## Structure

- `src/app/` - Next.js App Router (layout, pages)
- `src/components/` - Shared components
- `src/context/` - React context (Auth, Socket)
- `src/api/` - API client
- `src/hooks/` - Custom hooks

Old Vite entry (`main.jsx`, `App.jsx`) and `src/views/` (formerly `src/pages/`) are kept for reference; migrate components into `src/app/*/page.jsx` as needed.
