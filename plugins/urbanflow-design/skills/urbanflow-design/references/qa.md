
# Urbanflow UI QA

Checks what shipped against what was designed, then hands fixes to the GitHub coding agent (set up by Ryan) in a form it can execute unattended. Load `references/principles.md` for tokens and components.

## Step 0 — Scope

Confirm (only if not given): product/repo, module, branch or environment URL, and the section list. Modules are split into numbered sections (e.g. 1 Toolbar · 2 Main panel · 3 Card · 4 Delete confirmation). Default: all sections, in order.

## Step 1 — Collect evidence (one pass per section, before judging)

**Live (actual):** built-in browser at 1440×900 (`resize_window`), open the environment URL; if a sign-in page appears ask Pei Ning to sign in. Screenshot each section and its reachable states; `read_page` for real copy. Don't trigger destructive or paid actions (delete, render/generate) without asking — use existing items where possible.

**Figma (expected):** SVG exports of the expected frames (with QA notes). Export rules — check every file before using it:
- **Outline Text OFF** and **Include "id" attribute ON** (so font-family, size, weight and fill stay readable as markup).
- Verify: `grep -o '<text' file.svg | wc -l` — **0 means the export is unusable** for type QA; ask for a re-export.
- Read values from the SVG (`font-family`, `font-size`, `font-weight`, `fill`, rect sizes/positions) and map them to Flow variables/styles and code tokens (`@urbanflow/theme` / `libs/urbanflow-components/src/tailwind.css`).
If Pei Ning gives a Figma link instead, use `get_screenshot` + `get_design_context` per frame, batched (the Figma API rate-limits her often).

**Code (optional, read-only):** grep the repo for the section's component to cite the file an issue lives in.

## Step 2 — Compare, section by section

For each section check: layout and alignment · spacing (token steps 0/2/4/6/8/12/16/24/32) · sizes (32px fields, 24px tree rows, button sizes 24/28/32) · type (family Figtree vs DM Mono for numbers, size, weight, line height, colour/ink %) · colour tokens · radii (0/2/4/8/12/full) · shadows/strokes (inset rings) · icons (right glyph and optical size) · copy (exact text, casing, units) · states (hover, focus, pressed, disabled, loading, empty, error) · behaviour noted in the design (e.g. Toast auto-dismiss 4s).

Classify each difference:
- **Fixable by the agent** — visual/token/copy/state styling in existing components.
- **ENG EFFORT REQUIRED** — needs logic, data, API or new behaviour → a human handles it; the agent must skip it.
- **Needs decision** — design and build disagree and it isn't clear which is right (or the design is ambiguous).
- **Flag only** — issues noticed outside the QA notes; report, don't fix.

## Step 3 — Output

**A. QA log in chat** (default): per section, bullets `N.x · [type] · element — expected vs actual → fix (token/component)`, then a count per type and a one-line verdict.

**B. QA files for the repo** (on request): files go in `design-qa/<module>/` on `main` (e.g. `design-qa/<module-name>/`), named:
- `N. <Section> - live app current image.png`
- `N. <Section> - expected UI QA notes.svg`
Pei Ning manages files through the GitHub web UI (no git): tell her the exact folder path to type in "Create new file" (slash-typed path creates folders), then which files to upload. If this session has push access and she asks you to, commit them yourself — confirm first.

**C. GitHub issue for the coding agent** (on request) — use `references/qa/agent-issue-template.md`. Draft it in chat for review; create the issue only after Pei Ning says yes.

## Rules for anything the agent will run

- Self-contained: no questions mid-run; every file path, token, exact copy and expected value is in the issue.
- Skip **ENG EFFORT REQUIRED** items (list them in a separate section for Ryan).
- Work sections in order; **one commit per issue/finding**.
- **Flag, don't fix** anything not in the QA notes.
- Missing decisions → write **"Needs decision: …"** in the PR/comment and continue.
- Comment back on the issue when done, listing each finding as fixed / skipped (ENG EFFORT) / needs decision.
- Ryan reviews and merges PRs.

When drafting messages to Ryan, keep them plain and attribute reasoning to the design review rather than inventing technical justifications.
