# Readiness check

Run before writing and again before handing back.

**States** — for each component with variable content: empty / partial / full / at limit / over limit (legacy data); loading, running, stale, error, offline; long content (long names, many floors/zones, 6-digit values); permission variants (owner/editor/viewer); new vs returning project; feature flag on/off; after destructive actions (last floor deleted, all zones removed).

**Frame ↔ note consistency** — button labels and copy match exactly; the same component shows the same copy everywhere; every element mentioned is drawn and every non-obvious drawn element is explained; notes don't contradict the DS component's built-in behaviour (check `components.md` props); no leftover notes from older iterations; no `{placeholder}` braces left where final copy is needed.

**DS mapping** — colours, text styles, spacing, radius and shadows map to Flow variables and styles (`TextIcons/Primary`, `spacing/16`, `radius/lg`, `label/small`, `Shadow/sm`); elements are DS component instances, not detached copies. Raw values with no token → `Vague`, ask whether a token or a new component is intended. Note code-vs-DS drift (component not in code yet; shadcn mapping).

**Layout rules for dynamic content** — fixed vs hug, min/max, padding, alignment, truncation vs wrap vs grow, scroll behaviour, sticky regions, how items in a row align, behaviour at 1280 vs 1440. Numbers in px with the token (`16px / spacing/16`).

**Flow completeness** — every entry point; for each scenario every exit: primary, Cancel, Close/X (empty vs has input), Esc, click-outside, browser back, refresh mid-flow, navigating away during a run. Say where the user lands and what's kept.

**Logic & persistence** — limits and what happens at them; validation ranges and units; when data saves; what makes results stale; what triggers recalculation; ordering/placement rules; enable/disable conditions; each marked *same as current* or *changed from current*.

**Data** — source for every displayed value (API field, calc, default, user input), units, rounding, null/missing handling. If the data doesn't exist yet, that's an ENG EFFORT REQUIRED item and an open question (component before data).

**Copy** — new vs existing strings; where strings live in the repo (path, or TO BE UPDATED); placeholders and casing in Urbanflow voice.

**Assets** — icon names + size from the DS set; any render/image source; animation file link.

**Scope** — which product(s)/repo(s) this touches; anything only one product has.
