# Live sources — what's in the product today

## Products and repos (TO BE UPDATED as products split out)

Urbanflow is moving from one monorepo to separate products, each owned by one engineer, all importing the DS as its own published package.

| Product / area | Live URL | Repo | Notes |
|---|---|---|---|
| Core platform (projects, model canvas, analysis, compare, onboarding) | https://app.urbanflow.co/ | `City-Syntax/urbanflow-monorepo` | Legacy tokens `libs/urbanflow-components/src/tailwind.css` |
| Flux — retrofit onboarding, calibration → recommendations | https://flux.urbanflow.co | `City-Syntax/flux` (https://github.com/City-Syntax/flux) | First product split out; Pei Ning owns this experience. In the AppShell its modes (Model, HVAC, Weather, Runs, Results, Files) sit in the canvas UtilitiesToolbar, not the top bar. Carries the Urbanflow mark only as PNG |
| Design system package | https://components.urbanflow.co | `City-Syntax/urbanflow-components` (https://github.com/City-Syntax/urbanflow-components) | `@urbanflow/theme`, `@urbanflow/icons`, shadcn component registry (`registry/ui/`, incl. the Shell components) — every product imports it. Brand SVGs at `/brand/urbanflow-mark(-white).svg` |

When a product or repo isn't listed, ask Pei Ning for it once and suggest adding it here.

## Reading a repo

1. Attach it with the add-repo tool (read access) if it isn't in the session; don't pre-check with curl/`gh` — private repos 404 unauthenticated.
2. Clone shallow into the working directory; **read only** — never commit, push or open PRs from this skill.
3. Grep for the screen's visible labels or feature keyword → follow to the route/page component → its child components, hooks and API types. Capture: copy strings, field labels + units, option lists, default values ("from Archetype default"), validation rules, loading/empty/error branches, feature flags, where it navigates on exit.
4. Cite file paths in the reply so Pei Ning can check them. If code and live app disagree, the live app is what users see — design from it and note the difference.

## Reading a live URL

1. Load the `built-in-browser` skill; open the URL with `preview_start`. Request site access if asked.
2. If a sign-in page appears, ask Pei Ning to sign in in the browser pane; wait, then continue. Never enter credentials.
3. Resize to 1440×900 (`resize_window` width 1440, height 900) so screenshots match frame size; reset to desktop when done.
4. Prefer `get_page_text` / `read_page` for copy and structure; take screenshots for layout and states. Don't click anything destructive or that runs paid/long jobs (Run analysis, Delete, Share) — ask first.
5. Use real project data only as structure reference. Don't copy client names or client project data into designs — swap for sample data (see below).

## Sample data rules

- Projects: generic names ("Sample tower", "Office retrofit — Block A"), never CBRE or other client names/addresses unless Pei Ning says it's fine.
- Results (EUI, cost, carbon, solar): `[__]` or clearly illustrative values labelled "sample" in the reply. Never present them as real benchmarks.
- Parameters, archetypes, space uses, assemblies: real names from the repo.
