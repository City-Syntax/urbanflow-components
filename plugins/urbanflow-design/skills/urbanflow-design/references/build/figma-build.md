# Building in Figma — Urbanflow setup

Load `figma:figma-use` (mandatory before any `use_figma`) and `figma:figma-generate-design`; load `figma:figma-create-new-file` before creating a file.

## Where to build

- **DS library file:** Flow Design System — https://www.figma.com/design/NQpg4P9K158sjcEKmMLd8w/Flow-Design-System (fileKey `NQpg4P9K158sjcEKmMLd8w`). It holds the Color and Spacing variable collections, 19 text styles, 6 effect styles, the icon components, the Components page (`723:6170`) and feature components on pages named `↪ Compliance`, `↪ Comments`, `↪ Files`. Import and instance these components (`importComponentByKeyAsync` / `importComponentSetByKeyAsync` via the library) rather than redrawing them. Only for something Flow lacks, build it from Flow variables/styles and label it `⚠ not in Flow yet — <Component>`.
- **Destination:** Use the user-specified file, page and node. At the first build in a session, ask once for a destination only when none is supplied; offer a new file named `Urbanflow — explorations`. Add a page per request named `<YYYY-MM-DD> <feature>` when working in a dedicated exploration file. Otherwise add a clearly named section beside related work. Never edit Design or Design-System production frames unless explicitly requested. Preserve unrelated work and the library.

## Build steps

1. `search_design_system` (scoped to the Flow library once it's enabled in the sandbox file) for variables (`TextIcons/…`, `Background/…`, `spacing/…`, `radius/…`), text styles (`header/…`, `label/…`, `paragraph/…`, `metric/…`), effect styles (`Shadow/…`) and icon components. Bind every fill, stroke, gap, padding and radius to a Flow variable; apply text and effect styles.
2. If the Flow library isn't enabled in the sandbox file, ask Pei Ning to enable it (Assets → Libraries). If a variable or style still isn't found, don't draw a lookalike silently: build it from tokens as raw values, colour the layer name `⚠ detached — <Component>` and list it in the reply.
3. Layout: follow `references/build/visual-style.md` — auto layout for every container, no spacer layers (padding, gap or space-between only), and even padding bound to `spacing/*`.
   Frame: start from an **AppShell** instance (Shell page `6085:5003`; set `Product`), 1440×1024 like the file's own frames. Detach AppShell before customizing any screen. Preserve nested Flow instances and existing content; put panels, canvas content and tools directly in the detached structure, never in AppShell slots. Pin canvas tools with constraints. Product modes go in UtilitiesToolbar, never the top bar. Use `spacing/16` padding inside panels.
4. Text styles: Figtree Heading/Label/Paragraph; DM Mono Metric for numbers. Units as separate text layers in `TextIcons/Tertiary` (note its contrast gap).
5. Icons: instances of the Flow icon components at 14/16/20 (variant `Size=`) first. If no Flow icon fits, take one from **Tabler** outline or **Phosphor** regular/semibold. Keep new icons local until explicit approval or a library-update request. After approval, in the Flow DS file, add it to the Icons page in the right category: clone an existing icon wrapper, rebuild each `Size=20/16/14` variant with `figma.createNodeFromSvg`, use stroke 1.5px at 20 (1.2 at 16, 1.05 at 14), round caps and joins, no fills, and bind the stroke to `TextIcons/Placeholder`. Describe the source in the set description. Until the library is published, use a local stand-in at the same weight and flag it. List every new icon in the reply. Never Lucide, Heroicons or emoji.
6. Imagery: grey placeholder rects labelled "Massing render" / "Site aerial" unless real renders are supplied.
7. States: one frame per state, left→right, 80px apart, in the same Section. Put state notes directly under the most relevant frame, never to its right or inside it; use bullets for multiple points.
8. Screenshot each finished frame (`get_screenshot`) and check it against the self-check list before replying.

## Figma API notes

- Rate limits hit often for this user — batch reads, avoid re-fetching the same node, and prefer one `use_figma` script per frame over many small calls.
- The plugin API can't rename files; tell Pei Ning if a rename is needed.
- Give Pei Ning the link to the Section (`https://www.figma.com/design/<fileKey>/?node-id=<id with : → ->`).
