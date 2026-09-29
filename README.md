# urbanflow components

urbanflow's design system: tokens and icons on npm, plus re-skinned [shadcn/ui](https://ui.shadcn.com)
components you copy into your app. Preview everything at https://components.urbanflow.co.

## Use it in an app (Next.js or Vite, Tailwind v4)

```sh
npm i @urbanflow/theme @urbanflow/icons
```

**Theme.** In your main CSS file, replacing shadcn's generated `:root` / `@theme inline` blocks:

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "@urbanflow/theme";
```

**Fonts.** Load Figtree and DM Mono yourself:

- Next.js: `next/font/google` with `Figtree({ variable: "--font-figtree" })` and
  `DM_Mono({ variable: "--font-dm-mono", weight: "400" })`, with both classes on `<html>`.
- Vite: `npm i @fontsource/figtree @fontsource/dm-mono`, then in your entry file import
  `@fontsource/figtree/400.css`, `@fontsource/figtree/600.css` and `@fontsource/dm-mono/400.css`.

**Icons.**

```tsx
import { SearchIcon } from "@urbanflow/icons";
<SearchIcon size={16} className="text-content-secondary" />
```

**Components.** Add the registry to `components.json`:

```json
"registries": { "@urbanflow": "https://components.urbanflow.co/r/{name}.json" }
```

Then `npx shadcn add @urbanflow/<name>`. The component is now yours to edit. To pick up a newer
version, re-run the command and review the diff. Components we haven't changed come straight
from shadcn (`npx shadcn add dialog`) and use the urbanflow theme automatically.

Release notes live in each package's `CHANGELOG.md` ([theme](packages/theme/CHANGELOG.md),
[icons](packages/icons/CHANGELOG.md), [components](registry/CHANGELOG.md)). All packages share one version number.

## Working on this repo

See [CLAUDE.md](CLAUDE.md). `npm install`, `npm run dev`, `npm run check`.
