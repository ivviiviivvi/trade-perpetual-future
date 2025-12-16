# Repository Map & Key

Use this as a quick map of where things live after the reorg.

## App source (`src/`)
- `components/`
  - `trading/` — Trading UI: `TradePanel`, `PositionPanel`, `OrderHistory`
  - `analytics/` — Analytics UI: `DashboardPanel`, `PnLAnalytics`
  - `common/` — Shared UI: `RiskWarning`, `Soothsayer`
- `utils/` — Shared helpers (e.g., `markets.ts`)
- `assets/` — Static assets
- `index.css`, `main.tsx`, `App.tsx` — entry and global styles

## Docs (`docs/`)
- `guides/` — Product & technical guides (architecture, roadmap, quickstart, deployment, etc.)
- `ops/` — Process/ops (PR gardening, consolidation, governance, ops notes)
- `archives/` — PDFs/DOCXs and legacy/reference artifacts
- `adr/` + `adr-backlog.md` — Architectural decision records
- `reference-implementation.md` — Pointers to the target/reference repo

## Project config
- `package.json`, `vite.config.ts`, `tsconfig*.json`, `tailwind.config.js`, `postcss.config.js`, `eslint.config.js`
- `.github/` — CI/CD and workflow files
- `.specstory/` — SpecStory metadata

## Environment
- `.env.example` — sample env vars

## Quick links
- Guides index: `docs/guides/DOCUMENTATION_INDEX.md`
- Roadmap: `docs/guides/ROADMAP.md`
- Quickstart: `docs/guides/QUICKSTART.md`
