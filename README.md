# Omni-Loom — Vite Build

> Deterministic generative compilation for cyber-physical creativity.

Vite + React + TypeScript + Tailwind CSS. Pure static output — deploys to any CDN.

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
npx wrangler pages deploy dist   # Cloudflare Pages
vercel --prod                    # Vercel
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
