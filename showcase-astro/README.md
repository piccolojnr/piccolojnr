# piccolojnr — Astro showcase

Static portfolio built with [Astro](https://astro.build/), Tailwind CSS v4, and the same `02_projects` → `projects.json` sync as the Vite/React `showcase` app.

## Setup

```bash
pnpm install
```

## Environment

Copy `.env.example` to `.env` and set **`SITE_URL`** (no trailing slash) for correct sitemap, `robots.txt`, and canonical URLs in production. `VITE_SITE_URL` is also read for compatibility.

## Scripts

| Command | Description |
|--------|-------------|
| `pnpm dev` | Sync portfolio from `../02_projects`, then `astro dev` |
| `pnpm build` | Sync → sitemap/robots → `astro build` |
| `pnpm preview` | Preview production build |

## Deploy (Vercel)

Set the project root to **`showcase-astro`**, install command `pnpm install`, build `pnpm build`, output **`dist`**. Add `SITE_URL` to environment variables.

## Monorepo layout

- `scripts/sync-portfolio.mjs` writes to `public/data/projects.json` (from `../02_projects` or GitHub API).
- Source case studies live under repo root `02_projects/`.
