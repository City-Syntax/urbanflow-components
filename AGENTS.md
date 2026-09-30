# urbanflow components

The urbanflow design system. A designer maintains it by prompting an agent (you); she reviews the
result on the Vercel preview, not the code. Explain in plain design terms, keep PRs small, and
always give her the preview link. The brand is always lowercase: **urbanflow**, never UrbanFlow.

## What lives where

| Piece | Path | Ships as | Apps can edit? |
|---|---|---|---|
| Tokens (colour, type, shadow, radius) | `packages/theme/theme.css` | `@urbanflow/theme` on npm | No |
| Icons | `packages/icons/raw/*.svg` → generated | `@urbanflow/icons` on npm | No |
| Re-skinned shadcn components | `registry/ui/*.tsx` + `registry.json` | shadcn registry at components.urbanflow.co | Yes (they copy it) |
| Preview site | `app/` | components.urbanflow.co (Vercel) | — |

Only put a component in the registry once we've changed it. Unchanged shadcn components are
installed straight from shadcn by apps and pick up the theme automatically.

## Every change

1. Branch off `main`.
2. Make the change; make sure it shows on the preview page (`npm run dev`, http://localhost:3000).
3. `npm run check` must pass.
4. Add a changeset: `npx changeset`, or write `.changeset/<short-name>.md` directly:
   ```md
   ---
   "@urbanflow/theme": minor
   ---

   Added `info-xlight` colour.
   ```
   Write it for app engineers: what changed and what they need to do. All `@urbanflow/*` packages
   share one version, so list whichever package you touched: `@urbanflow/theme`, `@urbanflow/icons`,
   or `@urbanflow/registry` (components in `registry/`; its changelog lives in `packages/registry/`).
   - **patch**: fixed/tweaked a value, no names changed
   - **minor**: added a token, icon, component or variant
   - **major**: renamed or removed anything apps might use (a class name, icon, prop). Say what to replace it with.
5. Open a PR with `gh pr create`. Tell her to review the Vercel preview link on the PR.

Merging to `main` makes CI open a "Version Packages" PR (the changelog). Merging that publishes to npm.

## Figma is the source of truth — and it's messy. Stop and ask.

File: `CyjMpmGxUHezAqjmA5qXwI` (Platform) › page `🔹 Design System` (`723:6170`). Sections:
Colours `2146:21181`, Typography `1711:12198`, Shadow `1712:12819`, Icons `1726:14351`,
Radii `1712:12472`, Button `1712:14208`, Input `1712:16814`.

Before implementing, if the Figma source has any of these, **stop, explain the problem in one line,
and recommend a fix**: duplicated or conflicting variables (`Stroke/*` vs `Stroke-new/*`), leftovers
from another kit (`--p-*`, Polaris, Inter headings), anything marked deprecated / ignore / do not
implement / figma-only, gaps or misordered steps in a scale, typos in names. If she says ship it
as-is, do so and log it: `gh issue create --label figma-cleanup --title "…" --body "…"`.

## Tokens

Edit `packages/theme/theme.css`. Figma name → token name:
`Neutrals/neutral-10` → `--color-neutral-10`, `Semantic/info-primary` → `--color-info-primary`,
`TextIcons/*` → `--color-content-*`, `Background/*` → `--color-surface-*`, `Stroke*/*` → `--color-stroke-*`,
text style `header/large` → `--text-header-large` (+ `--line-height`, `--font-weight`).
shadcn's own tokens (`--primary`, `--border`, …) are mapped in the `:root` block; restyling a stock
shadcn component usually means changing that mapping, not the component.
Read values with the Figma MCP `get_variable_defs` on a section node id. The preview page reads
`theme.css` directly, so new tokens appear there automatically.

## Icons

1. Add `"name": "<figma node id of the Size=20 variant>"` to `packages/icons/figma-icons.json`.
2. `FIGMA_TOKEN=… npm run sync -w @urbanflow/icons` downloads every icon into `raw/`.
   (The Figma MCP works too, one call per icon: `download_assets` with `defaultFormat: "svg"`,
   save the `export` URL to `raw/<name>.svg`. It's rate-limited on the Starter plan.)
3. `npm run build -w @urbanflow/icons` generates `<NameIcon />` components; colours become `currentColor`.

## Components

`npx shadcn add <component>` writes into `registry/ui/`. Re-skin it (add `cva` variants, use theme
tokens, never hard-coded hex), add an item to `registry.json`:
```json
{ "name": "button", "type": "registry:ui", "title": "Button",
  "dependencies": ["radix-ui", "class-variance-authority"],
  "files": [{ "path": "registry/ui/button.tsx", "type": "registry:ui" }] }
```
and add a section for it with every variant to `app/page.tsx`.

**No comments in components** (`registry/ui/`): no `//`, `/* */` or JSDoc. Put anything that needs explaining in the PR description or the changeset instead.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
