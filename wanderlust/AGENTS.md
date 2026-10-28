<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# wanderlust

Next.js 16 App Router (React 19, Tailwind v4) travel landing site. All source is in `src/app` (pages/layout), `src/components/*.tsx` (home sections), `src/components/ui` (pre-generated shadcn), `src/hooks`, `src/lib`. No tests, no CI.

## Commands

- `npm run dev` (Turbopack), `npm run build`, `npm run lint` (bare `eslint`, ESLint 9 flat config in `eslint.config.mjs`).
- No typecheck script: run `npx tsc --noEmit`. It depends on Next's generated route types (`.next/types`, `next-env.d.ts` — both gitignored), otherwise the global `LayoutProps`/`PageProps` types are missing; on a fresh checkout run `npm run dev` or `build` once first.
- Verify with lint → `npx tsc --noEmit`; there are no tests. Full lint takes ~5 min on this machine (not hung) and currently fails on `react-hooks/set-state-in-effect` in `src/components/ui/carousel.tsx` and `src/hooks/use-mobile.ts` — a known baseline in CLI-generated files, not caused by your change.

## API / backend

- The `/add-destination` form POSTs to `http://localhost:5000/add-destination` (hardcoded; the client has no env vars). The API is a sibling Express 5 + MongoDB app in `../wanderlust-server`, outside this workspace: run it with `node index.js` (it has no start script) and give it a `DB_USER` Mongo URI in its `.env`.
- That endpoint is a stub — it logs and returns a string; nothing is persisted yet.

## UI conventions that differ from typical shadcn/Radix

- `src/components/ui/**` is shadcn `base-nova` built on `@base-ui/react`, **not Radix**: there is no `asChild` — pass `render={<Link href=… />}`; handlers such as `Select` `onValueChange` receive `null`, not just a string. Add new components with `npx shadcn add <name>` (reads `components.json`) instead of hand-writing them.
- Buttons are compact (`h-8` default); page sections enlarge them via `className`, and icons inside buttons use `data-icon="inline-start" | "inline-end"` so base-nova icon padding applies.
- `cn` comes from the `cn` npm package: `from "cn"` in ui files, or `from "@/lib/utils"`, which only re-exports it.
- No `next/image` usage and no `images.remotePatterns` in `next.config.ts`; photography is remote Unsplash URLs applied as CSS `background-image` or `role="img"` divs. Add remotePatterns before introducing `next/image` with remote sources.

## Toolchain constraints

- Keep `next.config.ts` intact: `reactCompiler` + `experimental.turbopackRustReactCompiler` (the babel-loader compiler path crashes on this Windows machine) and the `turbopack.rules` CSS block (`@tailwindcss/turbopack`) are load-bearing. Turbopack only — do not switch to webpack.
- React Compiler is on: don't add manual `useMemo`/`useCallback`/`memo` without a measured reason.
- Tailwind v4 with **no `tailwind.config`**: theme tokens and dark mode live in `src/app/globals.css` (`@theme`, `@custom-variant`); it also imports `shadcn/tailwind.css` for the base-nova presets.
- `Navbar`/`Footer` wrap every page in `src/app/layout.tsx` (Josefin Sans via `next/font`); compose pages from section components, not raw markup. Path alias: `@/*` → `src/*`.
