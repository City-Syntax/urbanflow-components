// Writes public/llms.txt: DESIGN.md + setup + tokens, components and icons generated from the code.
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";

const SITE = "https://components.urbanflow.co";
const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), "utf8");

const css = read("packages/theme/theme.css");
const vars = (prefix) =>
  [...css.matchAll(new RegExp(`--${prefix}-([a-z0-9-]+):\\s*([^;]+);`, "g"))]
    .filter(([, name]) => !name.includes("--"))
    .map(([, name, value]) => [name, value.trim()]);
const list = (prefix, cls) => vars(prefix).map(([n, v]) => `- \`${cls}-${n}\`: ${v}`).join("\n");
const colors = Object.fromEntries(vars("color"));
const resolve = (v) => v.replace(/var\(--color-([a-z0-9-]+)\)/g, (m, n) => (colors[n] ? `${colors[n]} (${n})` : m));

const { items } = JSON.parse(read("registry.json"));
const icons = Object.keys(JSON.parse(read("packages/icons/figma-icons.json")));
const demos = readdirSync(new URL("../app/demos/", import.meta.url))
  .filter((f) => f.endsWith(".tsx"))
  .sort()
  .map((f) => [f, read(`app/demos/${f}`)]);
const pascal = (n) => n.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase());

const text = `${read("DESIGN.md").trim()}

## Setup (Next.js or Vite, Tailwind v4)

1. \`npm i @urbanflow/theme @urbanflow/icons\`
2. In the main CSS file: \`@import "tailwindcss"; @import "@urbanflow/theme";\` (replace shadcn's generated colour blocks).
3. Load the fonts: Next.js \`next/font/google\` \`Figtree({ variable: "--font-figtree" })\` and \`DM_Mono({ variable: "--font-dm-mono", weight: "400" })\` on \`<html>\`; Vite \`@fontsource/figtree\` (400, 600) and \`@fontsource/dm-mono\` (400).
4. In \`components.json\`: \`"registries": { "@urbanflow": "${SITE}/r/{name}.json" }\`, then \`npx shadcn add @urbanflow/utils\` (Flow-aware \`cn()\`).
5. Add components with \`npx shadcn add @urbanflow/<name>\`. The code is copied into the app and can be edited. It lands at your \`components.json\` \`ui\` alias (usually \`@/components/ui/<name>\`) and its imports are rewritten to match, so import from there. The examples below use this repo's \`@/registry/ui/<name>\`; swap in your alias.

## Components

Each item's full source, props and dependencies: \`${SITE}/r/<name>.json\`. Live examples of every variant: ${SITE}

${items.map((i) => `- [${i.title ?? i.name}](${SITE}/r/${i.name}.json) \`@urbanflow/${i.name}\`: ${i.description ?? ""}`).join("\n")}

## Icons

\`import { SearchIcon } from "@urbanflow/icons"\`, then \`<SearchIcon size={16} />\` (sizes 14 / 16 / 20, colour from \`currentColor\`). Inside \`Button\` and \`IconButton\` the icon is sized for you, so don't pass \`size\`.

${icons.map((n) => `\`${pascal(n)}Icon\``).join(", ")}

## Tokens

### Colours (\`bg-*\`, \`text-*\`, \`border-*\`, also \`var(--color-*)\`)
${Object.entries(colors).map(([n, v]) => `- \`${n}\`: ${resolve(v)}`).join("\n")}

### Type (\`text-*\`; metric-* also needs \`font-mono\`)
${vars("text").map(([n, v]) => `- \`text-${n}\`: ${v}`).join("\n")}

### Shadows
${list("shadow", "shadow")}

### Radius
${list("radius", "rounded")}

## Examples

Real usage from the preview site (one file per section), showing how components compose, including
controlled state, Modal, Toast (\`ToastProvider\` + \`ToastViewport\`) and menus.

${demos.map(([f, src]) => `### ${f}\n\n\`\`\`tsx\n${src.trim()}\n\`\`\``).join("\n\n")}
`;

mkdirSync(new URL("../public/", import.meta.url), { recursive: true });
writeFileSync(new URL("../public/llms.txt", import.meta.url), text);
console.log(`Wrote public/llms.txt (${items.length} components, ${icons.length} icons).`);
