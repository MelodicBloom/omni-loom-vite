# Omni-Loom — Vite Build

> Deterministic generative compilation for cyber-physical creativity.

Vite + React + TypeScript + Tailwind CSS port of the Omni-Loom flagship case study.
Outputs a pure static bundle — zero server required, deploys to any CDN.

## Stack

| Tool | Purpose |
|---|---|
| Vite 5 | Sub-second HMR, pure static output |
| React 18 | Same component model as Next.js build |
| TypeScript 5 | Strict mode, same schema contracts |
| Tailwind CSS 3 | Same visual token system |
| clsx + tailwind-merge | Class composition |

## Dev

```bash
npm install
npm run dev        # localhost:5173
npm run typecheck  # tsc --noEmit
npm run build      # typecheck + vite build -> dist/
npm run preview    # serve dist/ locally
```

## Deploy

```bash
# Vercel (zero config)
vercel --prod

# Cloudflare Pages
npx wrangler pages deploy dist
```

## Source of Truth

- Schema: `src/lib/caseStudySchema.ts`
- Content: `src/content/omni-loom.case-study.json`
- Page: `src/pages/OmniLoomCaseStudy.tsx`

## Next.js → Vite diff

| Next.js | Vite |
|---|---|
| App Router `page.tsx` | `src/pages/OmniLoomCaseStudy.tsx` |
| `next/font` | Google Fonts via `index.html` |
| `export const metadata` | `<meta>` in `index.html` |
| `'use client'` directives | Removed (all components are client by default) |
| `redirect()` | Direct import in `App.tsx` |
