
# Urbanflow design build

Turns an idea into an Urbanflow design that starts from what's live and looks like the Urbanflow DS. Primary output is **Figma**; an **interactive HTML prototype** is offered as an add-on. Desktop web: **1440×1024** Figma frames built on the AppShell; HTML prototypes at 1440×900.

**Two layers, never mixed up:**
- **Live app + repos decide *what's there*** — structure, content, copy, flow, data. Never invent a layout for a screen that already exists.
- **The DS decides *how it looks*** — load `references/principles.md` (tokens, components, voice) first.
- Where the live app and the DS differ (e.g. a shadcn button vs Flow Button, or radii that don't match `radius/*`), design to the DS and list the difference in the reply.

## Step 1 — Understand the ask (one question max)

Pick the mode from the wording and load only that mode file:

| Mode | Signals | File |
|---|---|---|
| Mockup | "mock up", "screen", "variants", "what would X look like", "redesign" | `references/build/modes/mockup.md` |
| Wireframe | "wireframe", "rough", "lo-fi", "early idea" | `references/build/modes/wireframe.md` |
| Flow | "flow", "journey", "end to end", "screens connected" | `references/build/modes/flow.md` |
| Prototype | "prototype", "clickable", "tap through", "demo", "for testing" | `references/build/modes/prototype.md` |
| Interaction | "animation", "motion", "transition", "micro-interaction" | `references/build/modes/interaction.md` |

Use the user’s requested format. Default to Figma when the destination is Figma; add HTML only when requested. Ask one optional scope question only if a missing answer materially changes the design. Do not ask redundant format or approval questions.

## Step 2 — Find what's live (before designing anything)

Follow `references/build/live-sources.md`, in this order:
1. **Repos** — the product repo that owns the screen (monorepo or the new per-product repo). Pull real copy, labels, units, options, states, limits and flow from code. Cite file paths.
2. **Live app URLs** — open in the built-in browser; screenshot the current screen and its states. If a sign-in wall appears, ask Pei Ning to sign in; never sign in yourself.
3. **Screenshots** Pei Ning shares in chat.
4. **Claude Design Platform template** (Projects / Model / Analysis) — layout reference for the app shell when nothing above covers it.

If none of these covers the screen, build it anyway and label the frame "No live reference — layout assumed". Never present guessed flows or rules as current behaviour.

**Real content only.** Use real parameter names, units, archetypes and space uses from the repo. No lorem ipsum. Never invent numbers that look like results (EUI, cost, carbon), thresholds, limits or prices — use `[__]` and list them. Sample data must be plausible and clearly sample (e.g. "Sample tower, 24 floors").

## Step 3 — Load the rules

- `references/build/visual-style.md` — **always**: auto layout everywhere (no spacer layers — padding, gap or space-between only), even token padding, layered surfaces, radius, colour, type, component sizes, icons, file hygiene and the self-check.
- `references/principles.md` — SKILL.md plus `tokens.md`, `components.md`, `patterns.md`; `domain-glossary.md` for copy.
- For each DS component you'll use, check its props in `components.md` (or its `.d.ts` via `reading-the-ds.md`) so variants and states are real.

## Step 4 — Build in Figma

Follow `references/build/figma-build.md` (load the `figma:figma-use` and `figma:figma-generate-design` skills first — mandatory before `use_figma`). Always:
- DS component instances and bound variables, never detached look-alikes. If the DS library isn't available in the file, say so and build with tokens-as-values, flagged.
- When the user identifies an approved local component board, use those components as the task authority. Do not replace them with library instances or new stand-ins unless the user explicitly asks for promotion or reconciliation.
- Start from an AppShell instance (Figma Shell `6085:5003`, 1440×1024; set `Product`), then detach AppShell before customizing any screen. Place content directly in the detached structure, never in AppShell slots; preserve nested Flow instances and verify content before and after. Product modes and tools go in UtilitiesToolbar on the canvas, never as top-bar tabs.
- Keep live copy word for word; list every new or changed string in the reply.
- Show the states the change creates (empty, loading/running, stale, error, success, disabled).
- Name frames `Area / NN Step / State` (e.g. `Analysis / 02 Results / Stale`); a new step between two live ones gets a letter (`02b Target`).
- Auto layout for every container. Never use a rectangle, empty frame or spacer to make space — use padding, gap or spacing mode Auto (space-between). Keep padding even and bind it to `spacing/*`.
- Icons: Flow icons first; when Flow has none, use Tabler outline or Phosphor regular/semibold at the specified optical weight and add it to the Flow Icons page before use (see `references/build/figma-build.md` step 5).
- One Section per request titled `<Area> · <feature> (exploration – not final design)`.
- Put notes directly **under the most relevant frame**, never to its right. Arrange annotation cards manually on the canvas; annotation-note rows are not auto layout. Move the next frame row down so nothing overlaps.
- Do not restate visual details already visible in Figma. Notes cover requirements, behaviour, logic, data, copy, changed-from-current decisions, engineering effort and open questions. Document visual tokens only for an exception or a non-obvious constraint.
- Show component states visually to the right of the primary state in component/specimen areas. Do not substitute a prose state list when the states can be shown.
- Connect every transition from the exact entry control, tap target or event to the resulting screen using the established yellow FigJam-style connector: 3px Flow yellow, open arrowhead and orthogonal routing. Split non-linear journeys into explicit labelled branches instead of forcing one linear chain.

## Step 5 — HTML prototype (only if asked in Step 1)

Follow `references/build/html-prototype.md`: a published Artifact built with `assets/flow-tokens.css` and `assets/flow-icons/` and hand-built components that match the DS props, real interactions, and a screen list. Same content and states as the Figma frames.

## Step 6 — Self-check, then show

Run a quick internal pass with `references/audit.md` lenses. At minimum:
- One primary action per view; disabled until requirements are met.
- Every state the change creates is shown or listed; limits and failures have feedback.
- Exits defined (Cancel/Close/Back/Esc), matching neighbouring live screens.
- DS: tokens only, real components, radii per rule, Figtree + DM Mono for numbers only, status not by colour alone, no tinted cards/coloured left borders, in-house icons only.
- Copy in Urbanflow voice (flat, nouns for labels, bare verbs for actions, units in tertiary); no invented numbers or rules.
Fix what you can; list the rest as open questions.

Reply in chat with at most:
- One line: what you made, where (Figma link / artifact card), and which live source it's built on
- Live vs DS differences (if any)
- New/changed copy (if any)
- Open questions / placeholders, each with an owner (Pei Ning / PM / eng)
- One next-step offer ("want the HTML prototype too?" or "ready for handoff notes?")
