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

Stock shadcn components don't work with this theme on their own (it has no shadcn colours), so every
shadcn component an app uses goes through the registry, re-skinned with Flow tokens.

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
   or `@urbanflow/registry` (components; not on npm, it just holds the version and changelog).
   - **patch**: fixed/tweaked a value, no names changed
   - **minor**: added a token, icon, component or variant
   - **major**: renamed or removed anything apps might use (a class name, icon, prop). Say what to replace it with.
5. Open a PR with `gh pr create`. Tell her to review the Vercel preview link on the PR.

Merging to `main` makes CI open a "Version Packages" PR (the changelog). Merging that publishes to npm.

## Figma is the source of truth — and it's messy. Stop and ask.

File: `NQpg4P9K158sjcEKmMLd8w` (Flow Design System). Tokens live on the `Variables` page (Colours `2146:21181`,
Typography `1711:12198`, Shadow `1712:12819`, Radius `6009:2928`, Icons `1726:14351`). Shared components are on
`Components` (`723:6170`: Button `1712:14208`, Input `1712:16814`, …); pages starting with `↪` hold feature-only
components (`↪ Urbanflow`, `↪ Compliance`, `↪ Comments`, `↪ Files`). The old `CyjMpmGxUHezAqjmA5qXwI` (Platform) file is retired.

Before implementing, if the Figma source has any of these, **stop, explain the problem in one line,
and recommend a fix**: duplicated or conflicting variables (`Stroke/*` vs `Stroke-new/*`), leftovers
from another kit (`--p-*`, Polaris, Inter headings), anything marked deprecated / ignore / do not
implement / figma-only, gaps or misordered steps in a scale, typos in names. If she says ship it
as-is, do so and log it: `gh issue create --label figma-cleanup --title "…" --body "…"`.

## Tokens

Edit `packages/theme/theme.css`. **Only Flow tokens exist**: Tailwind's default colours, font sizes,
shadows and radii are switched off, and there are no shadcn colour aliases (`--primary`, `--border`…).
Figma name → token name is mechanical: lowercase, words joined with dashes, group kept for the
three role groups and dropped for the palettes:
`Background/Default` → `--color-background-default` (`bg-background-default`),
`TextIcons/InversePrimary` → `--color-texticons-inverse-primary`, `Stroke/default` → `--color-stroke-default`,
`Semantic/info-primary` → `--color-info-primary`, `Neutrals/neutral-10` → `--color-neutral-10`,
`Misc/misc-red` → `--color-misc-red`, text style `header/large` → `--text-header-large`
(+ `--line-height`, `--font-weight`), effect `Shadow/sm` → `--shadow-sm`, `radius/md` → `--radius-md`.
Figma aliases (e.g. `Background/Default` = `neutral-0`) stay aliases: `var(--color-neutral-0)`.
Read values with `use_figma` (`figma.variables`) or `get_variable_defs` on a section node id. The
preview page reads `theme.css` directly, so new tokens appear there automatically.

## Icons

1. Add `"name": "<figma node id of the Size=20 variant>"` to `packages/icons/figma-icons.json`.
2. `FIGMA_TOKEN=… npm run sync -w @urbanflow/icons` downloads every icon into `raw/`.
   (The Figma MCP works too, one call per icon: `download_assets` with `defaultFormat: "svg"`,
   save the `export` URL to `raw/<name>.svg`. It's rate-limited on the Starter plan.)
3. `npm run build -w @urbanflow/icons` generates `<NameIcon />` components; colours become `currentColor`.

## Components

`npx shadcn add <component>` writes into `registry/ui/`. It arrives with shadcn's colour classes,
which don't exist here, so re-skin it before anything else: add `cva` variants, use Flow classes only
(never hex), and swap Lucide icons for `@urbanflow/icons`. Starting mapping (check the Flow component in Figma):

| shadcn | Flow |
|---|---|
| `bg-background`, `bg-card`, `bg-popover` | `bg-background-default` |
| `text-foreground`, `*-foreground` on light | `text-texticons-primary` |
| `bg-primary` / `text-primary-foreground` | `bg-background-inverse` / `text-texticons-inverse-primary` |
| `bg-secondary`, `bg-muted` | `bg-background-light` |
| `bg-accent` (hover) | `bg-background-medium` |
| `text-muted-foreground` | `text-texticons-secondary` |
| `bg-destructive` / `text-destructive` | `bg-critical-primary` / `text-texticons-critical-primary` |
| `border`, `border-input` | `border-stroke-default` (hover `border-stroke-strong`) |
| `ring-ring`, focus rings | `shadow-focus` |

Then add an item to `registry.json`:
```json
{ "name": "button", "type": "registry:ui", "title": "Button",
  "dependencies": ["@radix-ui/react-slot", "class-variance-authority"],
  "files": [{ "path": "registry/ui/button.tsx", "type": "registry:ui" }] }
```
and add a section for it with every variant to `app/page.tsx`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
