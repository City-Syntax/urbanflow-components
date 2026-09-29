// Downloads every icon in figma-icons.json from Figma as SVG into raw/.
// Usage: FIGMA_TOKEN=... npm run sync -w @urbanflow/icons
// Token: Figma → Settings → Security → Personal access tokens (scope: file_content:read).
import { readFile, writeFile } from "node:fs/promises";

const FILE_KEY = "CyjMpmGxUHezAqjmA5qXwI";
const token = process.env.FIGMA_TOKEN;
if (!token) throw new Error("Set FIGMA_TOKEN (Figma personal access token).");

const icons = JSON.parse(await readFile(new URL("../figma-icons.json", import.meta.url)));
const ids = Object.values(icons).join(",");
const res = await fetch(
  `https://api.figma.com/v1/images/${FILE_KEY}?ids=${ids}&format=svg&svg_include_id=true`,
  { headers: { "X-Figma-Token": token } },
);
if (!res.ok) throw new Error(`Figma API ${res.status}: ${await res.text()}`);
const { images } = await res.json();

await Promise.all(
  Object.entries(icons).map(async ([name, id]) => {
    if (!images[id]) throw new Error(`Figma returned no image for ${name} (${id})`);
    const svg = await (await fetch(images[id])).text();
    await writeFile(new URL(`../raw/${name}.svg`, import.meta.url), svg);
  }),
);
console.log(`Synced ${Object.keys(icons).length} icons.`);
